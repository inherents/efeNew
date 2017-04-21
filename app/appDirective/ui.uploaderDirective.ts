/**
 * Created by adin1 on 2017/2/24.
 */
import {
  Component, Input, Directive, ElementRef, TemplateRef, ViewContainerRef, Compiler,
  Injectable
} from '@angular/core';
import {UIUploaderService} from "../appService/_base";



enum FileUploadStatus {
  Wait = 1,
  Uploading,
  Complete
}


function uploadFile() {
  // var fd = new FormData();
  // fd.append("fileToUpload", document.getElementById('fileToUpload').files[0]);
  // var xhr = new XMLHttpRequest();
  // xhr.upload.addEventListener("progress", uploadProgress, false);
  // xhr.addEventListener("load", uploadComplete, false);
  // xhr.addEventListener("error", uploadFailed, false);
  // xhr.addEventListener("abort", uploadCanceled, false);
  // xhr.open("POST", "UploadMinimal.aspx");
  // xhr.send(fd);
}

function uploadProgress(evt) {
  if (evt.lengthComputable) {
    var percentComplete = Math.round(evt.loaded * 100 / evt.total);
    //document.getElementById('progressNumber').innerHTML = percentComplete.toString() + '%';
  }
  else {
    //document.getElementById('progressNumber').innerHTML = 'unable to compute';
  }
}

function uploadComplete(evt) {
  /* This event is raised when the server send back a response */
  alert(evt.target.responseText);
}

function uploadFailed(evt) {
  alert("There was an error attempting to upload the file.");
}

function uploadCanceled(evt) {
  alert("The upload has been canceled by the user or the browser dropped the connection.");
}


class UploadFileItem {
  name: string;//文件名
  size: string;//文件大小
  file: File;//文件对象
  uid: string;//文件唯一标识
  progressText: string;//上传进度
  uploadStatus: FileUploadStatus;//上传状态
  private xhr: XMLHttpRequest;

  constructor(_name: string, _size: string, _file: File, _uid: string) {
    this.name = _name;
    this.size = _size;
    this.file = _file;
    this.uid = _uid;
    this.progressText = '0%';
    this.uploadStatus = FileUploadStatus.Wait;
  }

  /**
   * 是否能上传
   * @returns {boolean}
   */
  get canUpload(): boolean {
    return this.uploadStatus == FileUploadStatus.Wait;
  }

  /**
   * 是否能删除
   * @returns {boolean}
   */
  get canRemove(): boolean {
    return this.uploadStatus == FileUploadStatus.Complete
  }

  /**
   * 是否能取消
   * @returns {boolean}
   */
  get canCancel(): boolean {
    return this.uploadStatus == FileUploadStatus.Uploading;
  }

  set XHR(_value: XMLHttpRequest) {
    this.xhr = _value;
  }

  /**
   * 取消上传请求
   */
  cancelUpload() {
    this.xhr.abort();
  }
}


@Component({
  selector: '[uiUploader]',
  template: `
<div class="well">
  <input type="file" multiple (change)="onFileSelect($event)">
</div>
<p>请上传 jpg,png,jpeg,bmp,gif 文件</p>
  <ul class="ui_list">
  <li class="ui_list_head">
    <div class="ui_th ui_td">文件名</div>
    <div class="ui_th ui_td">大小</div>
    <div  class="ui_th ui_td">进度</div>
    <div  class="ui_th ui_td">状态</div>
  </li>
  <li class="ui_list_row" *ngFor="let file of fileList">
    <div  class="ui_td">{{file.name}}</div>
     <div class="ui_td">{{file.size}}</div>
      <div class="ui_td">
             <div class="progress" style="margin-bottom: 0;">
            <div class="progress-bar" role="progressbar" [style.width]="file.progressText" ></div>
                </div>
           </div>
      <div class="ui_td">
            <button class="btn btn-success btn-xs"  [disabled]="!file.canUpload" (click)="onFileSubmit(file,$event)">
              <span class="fa fa-upload">上传</span>
            </button>
            <button type="button" class="btn btn-warning btn-xs"  [disabled]="!file.canCancel" (click)="onFileCancel(file,$event)">
                    <span class="fa fa-ban"></span> 取消
                </button>
            <button type="button" class="btn btn-danger btn-xs"  (click)="onFileRemove(file,$event)">
                    <span class="fa fa-trash">删除</span>
             </button>
       </div>
</li>
</ul>
    
  `,
  styles: [`
   
  `]
})
export class UIUploaderComponent {


  @Input()
  uploader: UIUploaderService;
  fileList: Array<UploadFileItem>;
  private uidSet: Array;

  constructor() {
    this.fileList = [];
    this.uidSet = [];
    console.log('uploader ctor');
  }

  ngOnInit() {

  }

  private  getFileSize(file: any): string {

    let fileSize = '';
    if (file.size > 1024 * 1024) {
      fileSize = (Math.round(file.size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
    }
    else {
      fileSize = (Math.round(file.size * 100 / 1024) / 100).toString() + 'KB';
    }
    return fileSize;
  }

  /**
   * 提交整个上传队列中待上传的文件
   */
  fileListSubmit(): void {
    let uploadList = this.fileList.filter(_f=>_f.uploadStatus == FileUploadStatus.Wait);
    for (let f of uploadList) {
      this.onFileSubmit(f);
    }
  }

  private getUID(): string {
    let uid = Math.random() * 100000 + '_' + Math.random() * 100000;
    if (this.uidSet.indexOf(uid) >= 0) {
      uid = this.getUID();
    }
    return uid;
  }

  /**
   * 验证文件是否存在，已存在的文件不用添加到上传队列
   * @param _fileName 文件名
   * @returns {boolean}
   */
  private checkFile(_fileName: string): boolean {

    let arr = this.fileList.filter(_f=>_f.name == _fileName);

    return arr.length > 0;
  }

  /**
   * 选择文件并添加到上传队列
   * @param _event
   */
  onFileSelect(_event) {
    let files = _event.target.files;
    for (let f of files) {
      if (this.checkFile(f.name)) {
        continue;
      }
      this.fileList.push(new UploadFileItem(f.name, this.getFileSize(f), f, this.getUID()));
    }
  }

  /**
   * 提交单个文件
   * @param _file
   */
  onFileSubmit(_file: UploadFileItem) {

    let f = _file;
    f.uploadStatus = FileUploadStatus.Uploading;
    let fd = new FormData();
    fd.append('file', f.file);

    let upl = this.uploader;

    //上传对象额额外请求参数
    let formData = upl.formData;
    for (let key in formData) {
      fd.append(key, formData[key]);
    }

    var xhr = new XMLHttpRequest();
    f.XHR = xhr;
    //上传进度
    xhr.upload.addEventListener("progress", function (evt: ProgressEvent) {
      if (evt.lengthComputable) {
        var percentComplete = Math.round(evt.loaded * 100 / evt.total);
        f.progressText = percentComplete.toString() + '%';
      }
      else {
      }
    }, false);
    xhr.addEventListener("load", function (...args) {
      f.uploadStatus = FileUploadStatus.Complete;
      if(this.status==200){
        upl.onComplete(f,JSON.parse(this.response));
      }else{
        upl.onError(f,this.responseText);
      }

    }, false);
    xhr.addEventListener("error", function (...args) {
      f.uploadStatus = FileUploadStatus.Wait;
      f.progressText='0%';
      upl.onError(f,this.responseText);
    }, false);
    xhr.addEventListener("abort", function () {
      f.uploadStatus = FileUploadStatus.Wait;
      f.progressText='0%';
    }, false);
    xhr.open("POST", upl.action);
    xhr.setRequestHeader("TOKEN", upl.headers.TOKEN);
    xhr.send(fd);

  }

  onFileRemove(_file) {
    this.fileList.splice(this.fileList.map(_n=>_n.uid).indexOf(_file.uid), 1);
  }
}

