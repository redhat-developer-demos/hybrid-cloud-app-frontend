package com.redhat.developers.demo.data;

public class Request {

  private String text;
  private boolean uppercase;
  private boolean reverse;
  private int sleepInMillis;

  public String getText() {
    return text;
  }

  public int getSleepInMillis() {
    return sleepInMillis;
  }

  public void setSleepInMillis(int sleepInMillis) {
    this.sleepInMillis = sleepInMillis;
  }

  public void setText(String text) {
    this.text = text;
  }

  public boolean isUppercase() {
    return uppercase;
  }

  public boolean isReverse() {
    return reverse;
  }

  public void setReverse(boolean reverse) {
    this.reverse = reverse;
  }

  public void setUppercase(boolean uppercase) {
    this.uppercase = uppercase;
  }

  @Override
  public String toString() {
    return String.format("Request{text=%s, uppercase=%s, reverse=%s}", text, uppercase, reverse);
  }
}
