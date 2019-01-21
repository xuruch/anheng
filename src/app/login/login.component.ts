import { Component, OnInit } from '@angular/core';
import {Apollo} from 'apollo-angular';  // 引入 apollo-angular
import gql from 'graphql-tag'; // 引入gql函数
import { Observable } from 'rxjs/index'; // 引入 Observable
import {map} from 'rxjs/operators';
import { Course, Query } from '../types';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  name = '';
  pwd = '';
  isShow = false

  login(): void {
    // 判断账号密码
    if(this.name == 'admin' && this.pwd == 'anheng'){
      this.isShow = true
    }else if(this.name != 'admin'){
      alert('账号错误')
    }else if(this.pwd != 'anheng'){
      alert('密码错误')
    }
  }


  constructor(private apollo: Apollo) {
  }
  // 保存从接口获取的数据
  courses: Observable<Course[]>;
  ngOnInit() {
    // 使用 apollo query 方法获取数据 把它保存在users里
    this.courses = this.apollo.watchQuery<Query>({
      query: gql`
      query users{
        users{
          id
          username
          email
          password
        }
      }
      `
    })
      .valueChanges
      .pipe(
        map(result => result.data.users)
      );
  }

}
