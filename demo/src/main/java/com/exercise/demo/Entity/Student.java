package com.exercise.demo.Entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection ="students")
public class Student {

    @Id
    private String _id;
    private String name;
    private String caption;
    private String img1;
    private String img2;
    private String img3;
    








    public Student() {
    }



    public Student(String _id, String name, String caption, String img1, String img2, String img3) {
        this._id = _id;
        this.name = name;
        this.caption = caption;
        this.img1 = img1;
        this.img2 = img2;
        this.img3 = img3;
        
    }



    public String get_id() {
        return _id;
    }



    public void set_id(String _id) {
        this._id = _id;
    }



    public String getName() {
        return name;
    }



    public void setName(String name) {
        this.name = name;
    }



    public String getCaption() {
        return caption;
    }



    public void setCaption(String caption) {
        this.caption = caption;
    }



    public String getImg1() {
        return img1;
    }



    public void setImg1(String img1) {
        this.img1 = img1;
    }



    public String getImg2() {
        return img2;
    }



    public void setImg2(String img2) {
        this.img2 = img2;
    }



    public String getImg3() {
        return img3;
    }



    public void setImg3(String img3) {
        this.img3 = img3;
    }



    @Override
    public String toString() {
        return "Student [_id=" + _id + ", name=" + name + ", caption=" + caption + ", img1=" + img1 + ", img2=" + img2
                + ", img3=" + img3 + "]";
    }











}
