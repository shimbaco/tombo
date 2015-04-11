# Tombo

Node.jsで動く画像変換サーバです。Amazon S3などにアップロードされているJPEG画像を指定したサイズに変換して返します。
(PNG画像などには対応していません。)


## できること

* リサイズ
* Blur処理
* 画像の品質調整


## 環境

* [Node.js](https://nodejs.org/)
  * [Koa](http://koajs.com/)
  * [gm](http://aheckmann.github.io/gm/)
* [ImageMagick](http://www.imagemagick.org/)


## 動かし方

* ソースコードをローカルにダウンロードします。

```
$ git clone git@github.com:bojovs/tombo.git
```

* `.env.sample` を `.env` にリネームし、`TOMBO_IMAGE_HOST` に画像が格納されているサーバを指定します。

* 依存パッケージをインストールします。

```
$ npm install
```

* Foremanでサーバを起動します。

```
$ foreman s
```

* `http://localhost:5000/w:300,h:300/(画像のパス)` にアクセスすると、縦横300pxに変換された画像が表示されるはずです。


## パラメータ

### b (Blur)

デフォルト: 無効

```
http://localhost:5000/b:3/example.jpg
```


### g (Gravity)

デフォルト: `Center`

```
http://localhost:5000/w:400,h:300,g:North/example.jpg
```

##### 指定可能なパラメータ

* NorthWest
* North
* NorthEast
* West
* Center
* East
* SouthWest
* South
* SouthEast


### h (Height)

デフォルト: 実画像のHeight

```
http://localhost:5000/h:300/example.jpg
```


### q (Quality)

デフォルト: 90

```
http://localhost:5000/q:50/example.jpg
```


### w (Width)

デフォルト: 実画像のWidth

```
http://localhost:5000/w:400/example.jpg
```
