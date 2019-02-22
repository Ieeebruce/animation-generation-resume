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
* E-mail：lei*****@gmail.com
* 微信：l***

## 个人信息
* 雷**/男/1991
* 本科/河北工业大学通信工程
* 期望职位：前端工程师
* 期望薪资：8k

## 工作学习经历
* 2018-至今 自学前端中
* 2014-2018 **城市轨道交通
* 2010-2014 大学

## 个人技能
* vue
* html5
* css3
* JavaScript

## 作品
### 小小画板
* 源码：
* 预览：

`
var resumeCss = `
/*给简历加点样式*/
/*来点背景色*/
#resume {
  background: linear-gradient(to left, #F8CDDA, #1D2B64);
  color: white
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
writeCode('',content, container, () => {
  appendResume(markDown, () => {
    writeCode(content,resumeCss, container)
  })
});


function appendResume(markdown, fn) {
  let resumeEditor = document.createElement('pre');
  resumeEditor.classList.add('resumeEditor');
  resumeEditor.id = 'resume';
  document.body.appendChild(resumeEditor);
  let m = 0;
  let id = setInterval(() => {
    m++;
    x = markdown.substring(0, m)
    resumeEditor.innerHTML = x;
    if (m >= markdown.length) {
      window.clearInterval(id);
      document.getElementById('resume').innerHTML =
        marked(markdown);
      fn && fn.call();
    }
  }, 0);
}

function writeCode(preCode,codeString, tagContainer, fn) {
  let n = 0;
  let id = setInterval(() => {
    n++;
    tagContainer.innerHTML = preCode || '';
    styleTag.innerHTML = styleTag.innerHTML || '';
    let x = preCode+ codeString.substring(0, n);
    tagContainer.innerHTML =  x;
    tagContainer.innerHTML = Prism.highlight(x, Prism.languages.css, 'css');
    styleTag.innerHTML +=  codeString.substring(n-1, n);
    tagContainer.scrollTop = tagContainer.scrollHeight;
    if (n >= codeString.length) {
      window.clearInterval(id);
      fn && fn.call();
    }
  }, 0)
}