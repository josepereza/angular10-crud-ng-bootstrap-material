import { Component, OnInit,ViewChild } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../post';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  posts:Post[]=[];
 
  displayedColumns: string[] = ['id', 'title', 'body','actions'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.refreshposts();
 
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
deletePost(id){
  this.postService.delete(id).subscribe(res => {
       this.posts = this.posts.filter(item => item.id !== id);
       console.log('Post deleted successfully!');
       this.refreshposts();
  })
}
refreshposts() {
  this.postService.getAll().subscribe((data: any)=>{
    this.dataSource= new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.posts = data;
    console.log(this.posts);
     
    
})
}
}
