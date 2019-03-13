var content = `/* 大家好，我是ieeebruce
* 三月了，好多公司都在招聘，需要准备简历了。
* 说做就做，我也来写一份简历！
*/

/* 首先给所有元素加上过渡效果 */
* {
  transition: all .5s;
}
/* 白色背景太单调了，我们来点背景 */
html {
  color: rgb(255,255,255);
  background: #1D2B64;
  background: -webkit-linear-gradient(to left, #F8CDDA, #1D2B64);
  background: linear-gradient(to left, #F8CDDA, #1D2B64);
  
}
/* 文字离边框太近了 */
.styleEditor {
  padding: .5em;
  border: 1px solid;
  margin: .5em;
  overflow: auto;
  width: 45vw; height: 90vh;
}
/* 代码高亮 */
.token.selector{ color: #fb5778; }
.token.property{ color: rgb(193, 222, 2); }
.token.punctuation{ color: white; }
.token.function{ color: rgb(72, 253, 239); }

/* 加点 3D 效果呗 */
html{
  perspective: 1000px;
}
.styleEditor {
  position: fixed; left: 0; top: 0;
  -webkit-transition: none;
  transition: none;
  -webkit-transform: rotateY(10deg) translateZ(-100px) ;
          transform: rotateY(10deg) translateZ(-100px) ;
}

/* 接下来我给自己准备一个编辑器 */
.resumeEditor{
  position: fixed; right: 0; top: 0;
  padding: .5em;  margin: .5em;
  width: 48vw; height: 90vh;
  border: 1px solid;
  background: #1D2B64;
  background: -webkit-linear-gradient(to left, #F8CDDA, #1D2B64);
  background: linear-gradient(to left, #F8CDDA, #1D2B64);  
  overflow: auto;
}`
var markDown = `# 个人简历
## 联系方式
* 手机：155********
* E-mail：i********@foxmail.com
* 微信：lht*******

## 个人信息
* 雷** / 男/ 1991
* 本科 /****大学通信工程
* 期望职位：初级前端工程师

## 工作学习经历
* 2018.9-至今 自学前端中
* 2014-2018 城市轨道交通有限公司运营分公司
* 2010-2014 ****大学

## 个人技能
* HTML5 & CSS3：能独立制作精美网页，掌握动画、过渡效果等技术，像素级还原设计稿，追求审美。
* JavaScript：掌握原型、this、闭包、AJAX、JSONP等概念，部分了解ES6。
* Vue：初步了解Vue的组件，会一点使用Karma+Mocha的单元测试
* HTTP：了解HTTP协议及性能优化
* 基本npm/git的使用

## 作品
* Keyboard导航
源码：https://github.com/Ieeebruce/Keyboard-nav
预览：https://ieeebruce.github.io/Keyboard-nav/index.html
描述：该项目使用原生JavaScript、CSS3实现。能够鼠标点击或者键盘导航到对应的页面。可以自定义导航网址。两种主题。
* 动态简历
源码：https://github.com/Ieeebruce/animation-generation-resume
预览：https://ieeebruce.github.io/animation-generation-resume/
描述：使用了一个prism的库实现了代码高亮。主要思路就是利用setTimeout函数将代码追加到页面中。
`
var resumeCss = `
/*给简历加点样式*/
/*来点背景色*/
#resume {
  background: linear-gradient(to left, #F8CDDA, #1D2B64);
  color: white;
  width: 48vw;
}
#resume a{
  color:white;
  text-decoration:none
}
/*标题居中*/
#resume h1 {
  text-align: center
}

#resume h2 {
  margin: 10px auto 0 20px;
  color: rgb(255, 188, 0)
}

#resume ul {
  margin: 0 auto 0 10px;
  padding-top: 0;
}

#resume li {
  border-bottom: 1px solid gray;
  padding-bottom: 5px;
  font-size: 18px;
}

#resume h3 {
  margin-left: 30px;
  margin-bottom: 0;
}
`
let range = document.getElementById("speed");
var speed = 1000 / range.value;
! function changeSpeed() {
  range.onchange = function () {
    speed = 1000 / this.value;
    console.log(speed)
  };
}.call();

writeCode('', content, container, () => {
  appendResume(markDown, () => {
    writeCode(content, resumeCss, container)
  })
});


function appendResume(markdown, fn) {
  let resumeEditor = document.createElement('pre');
  resumeEditor.classList.add('resumeEditor');
  resumeEditor.id = 'resume';
  document.body.appendChild(resumeEditor);
  let m = 0;
  ! function setTime2() {

    setTimeout(() => {
      m++;
      x = markdown.substring(0, m)
      resumeEditor.innerHTML = x;
      if (m < markdown.length) {
        setTime2();
      } else {
        document.getElementById('resume').innerHTML =
          marked(markdown);
        fn && fn.call();
      }
    }, speed);
  }.call();
}

function writeCode(preCode, codeString, tagContainer, fn) {
  let n = 0;
  ! function setTime() {
    setTimeout(() => {
      n++;
      tagContainer.innerHTML = preCode || '';
      styleTag.innerHTML = styleTag.innerHTML || '';
      let x = preCode + codeString.substring(0, n);
      tagContainer.innerHTML = x;
      tagContainer.innerHTML = Prism.highlight(x, Prism.languages.css, 'css');
      styleTag.innerHTML += codeString.substring(n - 1, n);
      tagContainer.scrollTop = tagContainer.scrollHeight;
      if (n < codeString.length) {
        setTime();
      } else {
        fn && fn.call();
      }
    }, speed)
  }.call();
}