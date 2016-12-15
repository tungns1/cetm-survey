import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { GetUploadURL } from './config';

interface IFileNode {
  path: string;
  name: string;
}

export class FileNode {

  constructor(path: string, name: string) {
    this.path = path;
    this.name = name;
    this.is_dir = path.endsWith("/");
  }

  addChildren(nodes: IFileNode[]) {
    let children = nodes.map(n => new FileNode(this.path + n.path, n.name));
    this.rxChildren.next(children);
  }

  path: string;
  name: string;
  is_dir?: boolean;
  rxChildren = new BehaviorSubject<FileNode[]>([]);

  Refresh() {
    return new Observable<FileNode[]>((observer: Observer<FileNode[]>) => {
      let xhr = new XMLHttpRequest();
      xhr.onload = e => {
        if (xhr.status === 200) {
          const html = xhr.response;
          const nodes = HtmlToFiles(html);
          this.addChildren(nodes);
          observer.next(this.rxChildren.value);
          observer.complete();
        } else {
          observer.error(xhr.response);
        }
      }

      xhr.onerror = e => {
        observer.error(e);
        observer.complete();
      }

      xhr.open("GET", GetUploadURL(this.path));
      xhr.send();
    })
  }

  Create(file: File, name: string) {
    return new Observable<number>((observer: Observer<number>) => {
      var form = new FormData();
      var xhr = new XMLHttpRequest();
      xhr.upload.addEventListener("progress", (e: any) => {
        if (e.lengthComputable) {
          observer.next(e.loaded / e.total);
        }
      }, false);
      xhr.upload.addEventListener("load", (e: any) => {
        observer.next(1);
        observer.complete();
        setTimeout(() => this.Refresh(), 1000);
      });
      xhr.upload.onload = e => observer.error(e);
      xhr.open("POST", GetUploadURL(this.path));
      form.append("name", name);
      form.append("file", file);
      xhr.send(form);
    })
  }

  Expand() {
    this.Refresh().subscribe(() => {
      this.expanded = true;
    })
  }

  Close() {
    this.expanded = false;
    this.rxChildren.next([]);
  }

  get URL() {
    return GetUploadURL(this.path);
  }

  private expanded = false;
}

function HtmlToFiles(html: string) {
  var el = document.createElement('div');
  el.innerHTML = html;
  var anchors = el.getElementsByTagName('a'); // Live NodeList of your anchor elements
  var nodes: IFileNode[] = [];

  for (var index = 0; index < anchors.length; index++) {
    var element = anchors[index];
    var href = element.getAttribute("href");

    nodes.push({ path: href, name: element.innerText });
  }
  return nodes;
}
