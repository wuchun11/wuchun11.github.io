﻿/**

 layui官网

*/

layui.define(['code', 'element', 'table', 'util'], function(exports){
  var $ = layui.jquery
  ,element = layui.element
  ,layer = layui.layer
  ,form = layui.form
  ,util = layui.util
  ,device = layui.device();


  //阻止IE7以下访问
  if(device.ie && device.ie < 8){
    layer.alert('Layui最低支持ie8，您当前使用的是古老的 IE'+ device.ie + '，你丫的肯定不是程序猿！');
  }


  layer.ready(function(){
    var local = layui.data('layui');

    //升级提示
    if(local.version && local.version !== layui.v){
      layer.open({
        type: 1
        ,title: '更新提示' //不显示标题栏
        ,closeBtn: false
        ,area: '300px;'
        ,shade: false
        ,offset: 'b'
        ,id: 'LAY_updateNotice' //设定一个id，防止重复弹出
        ,btn: ['更新日志', '朕不想升']
        ,btnAlign: 'c'
        ,moveType: 1 //拖拽模式，0或者1
        ,content: ['<div class="layui-text">'
          ,'layui 已更新到：<strong style="padding-right: 10px; color: #fff;">v'+ layui.v + '</strong> 请注意升级！'
        ,'</div>'].join('')
        ,skin: 'layui-layer-notice'
        ,yes: function(index){
          layer.close(index);
          setTimeout(function(){
            location.href = '/doc/base/changelog.html';
          }, 500);
        }
        ,end: function(){
          layui.data('layui', {
            key: 'version'
            ,value: layui.v
          });
        }
      });
    }
    layui.data('layui', {
      key: 'version'
      ,value: layui.v
    });
    


    //公告
    layui.data('layui', {
      key: 'notice_20171212'
      ,remove: true
    });

    
  });

  

  //首页banner
  setTimeout(function(){
    $('.site-zfj').addClass('site-zfj-anim');
    setTimeout(function(){
      $('.site-desc').addClass('site-desc-anim')
    }, 5000)
  }, 100);


  //数字前置补零
  var digit = function(num, length, end){
    var str = '';
    num = String(num);
    length = length || 2;
    for(var i = num.length; i < length; i++){
      str += '0';
    }
    return num < Math.pow(10, length) ? str + (num|0) : num;
  };


  //下载倒计时
  var setCountdown = $('#setCountdown');
  if($('#setCountdown')[0]){
    $.get('/api/getTime', function(res){
      util.countdown(new Date(2017,7,21,8,30,0), new Date(res.time), function(date, serverTime, timer){
        var str = digit(date[1]) + ':' + digit(date[2]) + ':' + digit(date[3]);
        setCountdown.children('span').html(str);
      });
    },'jsonp');
  }



  for(var i = 0; i < $('.adsbygoogle').length; i++){
    (adsbygoogle = window.adsbygoogle || []).push({});
  }


  //展示当前版本
  $('.site-showv').html('2.2.5');
  
   //获取下载数
  //$.get('//fly.layui.com/api/handle?id=10&type=find', function(res){
     // $('.site-showdowns').html(res.number);
 // }, 'jsonp');
  
  //记录下载
  $('.site-down').on('click',function(){
      $.get('//fly.layui.com/api/handle?id=10', function(){}, 'jsonp');
  });

  //获取Github数据
  var getStars = $('#getStars');
  if(getStars[0]){
    $.get('https://api.github.com/repos/sentsin/layui', function(res){
      getStars.html(res.stargazers_count);
    }, 'json');
  }
  
  //固定Bar
  if(global.pageType !== 'demo'){
    util.fixbar({
      bar1: true
      ,click: function(type){
        if(type === 'bar1'){
          location.href = 'http://fly.layui.com/';
        }
      }
    });
  }
  
  //窗口scroll
  ;!function(){
    var main = $('.site-tree').parent(), scroll = function(){
      var stop = $(window).scrollTop();

      if($(window).width() <= 750) return;
      var bottom = $('.footer').offset().top - $(window).height();
      if(stop > 61 && stop < bottom){
        if(!main.hasClass('site-fix')){
          main.addClass('site-fix');
        }
        if(main.hasClass('site-fix-footer')){
          main.removeClass('site-fix-footer');
        }
      } else if(stop >= bottom) {
        if(!main.hasClass('site-fix-footer')){
          main.addClass('site-fix site-fix-footer');
        }
      } else {
        if(main.hasClass('site-fix')){
          main.removeClass('site-fix').removeClass('site-fix-footer');
        }
      }
      stop = null;
    };
    scroll();
    $(window).on('scroll', scroll);
  }();

  //示例页面滚动
  $('.site-demo-body').on('scroll', function(){
    var elemDate = $('.layui-laydate')
    ,elemTips = $('.layui-table-tips');
    if(elemDate[0]){
      elemDate.each(function(){
        var othis = $(this);
        if(!othis.hasClass('layui-laydate-static')){
          othis.remove();
        }
      });
      $('input').blur();
    }
    if(elemTips[0]) elemTips.remove();

    if($('.layui-layer')[0]){
      layer.closeAll('tips');
    }
  });
  
  //代码修饰
  layui.code({
    elem: 'pre'
  });
  
  //目录
  var siteDir = $('.site-dir');
  if(siteDir[0] && $(window).width() > 750){
    layer.ready(function(){
      layer.open({
        type: 1
        ,content: siteDir
        ,skin: 'layui-layer-dir'
        ,area: 'auto'
        ,maxHeight: $(window).height() - 300
        ,title: '目录'
        //,closeBtn: false
        ,offset: 'r'
        ,shade: false
        ,success: function(layero, index){
          layer.style(index, {
            marginLeft: -15
          });
        }
      });
    });
    siteDir.find('li').on('click', function(){
      var othis = $(this);
      othis.find('a').addClass('layui-this');
      othis.siblings().find('a').removeClass('layui-this');
    });
  }

  //在textarea焦点处插入字符
  var focusInsert = function(str){
    var start = this.selectionStart
    ,end = this.selectionEnd
    ,offset = start + str.length

    this.value = this.value.substring(0, start) + str + this.value.substring(end);
    this.setSelectionRange(offset, offset);
  };

  //演示页面
  $('body').on('keydown', '#LAY_editor, .site-demo-text', function(e){
    var key = e.keyCode;
    if(key === 9 && window.getSelection){
      e.preventDefault();
      focusInsert.call(this, '  ');
    }
  });


  //搜索组件
  form.on('select(component)', function(data){
    var value = data.value;
    location.href = value;
  });

  var editor = $('#LAY_editor')
  ,iframeElem = $('#LAY_demo')
  ,demoForm = $('#LAY_demoForm')[0]
  ,demoCodes = $('#LAY_demoCodes')[0]
  ,runCodes = function(){
    if(!iframeElem[0]) return;
    var html = editor.val();

    html = html.replace(/=/gi,"layequalsign");
    html = html.replace(/script/gi,"layscrlayipttag");
    demoCodes.value = html.length > 100*1000 ? '<h1>卧槽，你的代码过长</h1>' : html;

    demoForm.action = 'runHtml.html';
    demoForm.submit();

  };
  $('#LAY_demo_run').on('click', runCodes), runCodes();

  //让导航在最佳位置
  var thisItem = $('.site-demo-nav').find('dd.layui-this');
  if(thisItem[0]){
    var itemTop = thisItem.offset().top
    ,winHeight = $(window).height()
    ,elemScroll = $('.layui-side-scroll');
    if(itemTop > winHeight - 120){
      elemScroll.animate({'scrollTop': itemTop/2}, 200)
    }
  }


  //查看代码
  $(function(){
    var DemoCode = $('#LAY_democode');
    DemoCode.val([
      DemoCode.val()
      ,'<body>'
      ,global.preview
      ,'\n<script src="//res.layui.com/layui/dist/layui.js" charset="utf-8"></script>'
      ,'\n<!-- 注意：如果你直接复制所有代码到本地，上述js路径需要改成你本地的 -->'
      ,$('#LAY_democodejs').html()
      ,'\n</body>\n</html>'
    ].join(''));
  });

  //点击查看代码选项
  element.on('tab(demoTitle)', function(obj){
    if(obj.index === 1){
      if(device.ie && device.ie < 9){
        layer.alert('强烈不推荐你通过ie8/9 查看代码！因为，所有的标签都会被格式成大写，且没有换行符，影响阅读');
      }
    }
  })


  //手机设备的简单适配
  var treeMobile = $('.site-tree-mobile')
  ,shadeMobile = $('.site-mobile-shade')

  treeMobile.on('click', function(){
    $('body').addClass('site-mobile');
  });

  shadeMobile.on('click', function(){
    $('body').removeClass('site-mobile');
  });

  exports('global', {});
});