(function() {
  'use strict';

  function TestCtrl($scope, $http) {
    var _this = this;
    /* medium editor test */
    $scope.mediumEditorOptions = {
      'toolbar': {
        'buttons': [
          'bold', 
          'italic',
          'underline',
          'header1',
          'header2',
          'quote',
          'orderedlist',
          'unorderedlist',
          'image'
        ]
      }
    };
    $scope.text = 'This text gets is shown via .$render()';
    $scope.insertAddons = {
      'images': {
        'fileUploadOptions': {
          'url': 'new-upload.php'
        }
      }
    };

    /* owlcarousel test */
    $scope.owlOptions = {
      // items: 5,
      nav: true,
      // dots: true,
      responsive:{
        0: {
          items: 1,
          nav: true
        },
        300: {
          items: 2,
          nav: true
        },
        600: {
          items: 3,
          nav: false
        },
        1000: {
          items: 5,
          nav: true,
          loop: false
        }
      }
    };
    $scope.series = [{'name':'Date A Live Movie: Mayuri Judgment','synopsis':'Abril 10. Hoy es el primer dia de escuela despues de las vacaciones de primavera. Despues de ser despertado por su linda hermana, Itsuka Shidou creica que este seria de otro dia normal. April 10th. Today was the first school day morning after the end of Spring vacation. After being woken up by his cute little sister, Itsuka Shidou believed that it would be the start of another normal day. En cuanto a la prediccion de conocer a una chica que se llamaba a si misma un espiritu..... Junto con un gran impacto, el paisaje urbano desaparecio sin dejar rastro. En una esquina de la calle que ahora fue convertida en un crater una chica estaba ahi. \'-Tu, has venido a matarme tambien?\' Ella es el desastre que puede destruir la humanidad, un monstruo de origen desconocido, y siendo rechazada por el mundo. Hay solo 2 vias para detener a esta chica: Aniquilacion, o la Conversacion. Su pequeña hermana Kotori, vestida en un uniforme militar, le dice esto a Shidou: \'Desde que estamos en esto, ve y ten una cita con ella, y haz que el Espiritu se enamore de ti!Qu.....Queeeeee¡?','chaptersNumber':1,'minutes':120,'year':2015,'season':'spring','poster':'http://oi64.tinypic.com/15daxci.jpg','backgroundImage':'sd','trailer':'tra','japaneseName':'劇場版 デート ア ライブ 万由里ジャッジメント','studioId':'5743d2fae93b9c1a4c693028','status':'finished','type':'movie','genres':['Acción','Romance','Ecchi','Mecha','Fantasía','Shojo'],'groupId':'1','id':'56df9acbb4a5c01a0d224065'},{'name':'No Game, No Life','synopsis':'No Game, No Life se centra en Sora y Shiro, unos hermanos cuya reputación de NEETs hikikomoris y gamers han hecho que comiencen a extenderse leyendas urbanas suyas por todo internet. Estos dos gamers consideran que el mundo real no es más que “un juego de mierda”. Un día, un chico llamado “Dios” les invoca en un mundo alternativo. En este mundo, Dios ha prohibido la guerra y declarado que todo se decide en base a los juegos, incluso las fronteras de los países. La humanidad vive ahora en una ciudad por culpa del resto de razas. Se convertirán Sora y Shiro, hermano y hermana, en los salvadores de este mundo alternativo.','chaptersNumber':12,'minutes':24,'year':2016,'season':'spring','poster':'http://oi63.tinypic.com/2qusmfm.jpg','backgroundImage':'http://hanabee.tv/assets/program-images/3nogifekeyimageid.jpg','trailer':'tra','japaneseName':'ノーゲーム・ノーライフ','studioId':'5743d2fae93b9c1a4c693028','status':'finished','type':'serie','genres':['Acción','Romance','Ecchi'],'groupId':'1','id':'56df9e4cb4a5c01a0d224066'},{'name':'Big Order','synopsis':'La historia está protagonizada por un estudiante de instituto llamado Eiji Hoshimiya que guarda un secreto: Cuando era más joven deseaba la destrucción del mundo. Las hadas dan a ciertas personas poderes especiales llamados Orders. Lo que los Orders pueden hacer con sus poderes depende de sus deseos. Diez años después de la Gran Destrucción, Eiji lucha para adecuarse a su inmenso poder.','chaptersNumber':10,'minutes':24,'year':2016,'season':'winter','poster':'https://googledrive.com/host/0B9MDBn2mAYUqSS1aUXo5ajVxbHc','backgroundImage':'https://googledrive.com/host/0B9MDBn2mAYUqVU5OX09IbTZlRjg','trailer':'sd', 'japaneseName':'ビッグオーダー','studioId':'5743d2fae93b9c1a4c693028','status':'finished','type':'serie','genres':['Acción','Fantasía','Shounen'],'id':'56dfb157b4a5c01a0d224068'},{'name':'JK Meshi!','synopsis':'Three high school girls have mastered the art of cooking simple, B-class dishes called JK meshi. The three girls — Reina, Ryouka, and Ruriko — are all classmates in their second year of high school. They often get distracted when studying for tests, and when they do, they cook JK meshi.\n(Source: ANN)','chaptersNumber':12,'year':2014,'season':'autumn','poster':'http://fs5.directupload.net/images/160309/qhjtu9u6.jpg','backgroundImage':'http://cs628029.vk.me/v628029220/1b3a1/KbpDlXPCdS0.jpg','japaneseName':'JKめし！','status':'finished','type':'serie','genres':[],'id':'56dfb603b4a5c01a0d22406a'},{'name':'Koyomimonogatari','synopsis':'Tras los acontecimientos de Koimonogatari, volvemos al nada común día a día de Koyomi Araragi, que seguirá involucrado en experiencias sobrenaturales teniendo esta vez una la tragedia que se prevee. Mientras tanto, en la isla, la nueva generación de pilotos la defiende con uñas y dientes del asedio de los Festum y comienzan a sufrir las consecuencias de usar unos Fafner tan poderosos: todos están mutando de alguna manera. ¿Perderán su humanidad a este paso o lograrán encontrar la esperanza que todos anhelan?','chaptersNumber':14,'year':2014,'season':'summer','poster':'http://fs5.directupload.net/images/160309/wvobu5i6.jpg','backgroundImage':'http://i.imgur.com/na0lKZF.jpg','trailer':'tr','japaneseName':'暦物語','studioId':'5743d2fae93b9c1a4c693028','status':'ongoing','type':'serie','genres':['Acción','Romance'],'id':'56dfb66cb4a5c01a0d22406b'},{'name':'Luck & Logic','synopsis':'In L.C. 922, people faced a sudden crisis.\nIn Tetra Heaven, the land of legend, a hundred years of war had come to a close. The gods who lost the war searched for a new place to live, and found it in Septpia, the human world, which they proceeded to attack. The Logicalists attached to ALCA, a special police agency whose duty it was to protect cities from assaults by foreigners (angels), were compelled to act in defense of cities, whether they wished to or not.\nAnd depending on their ability, Logicalists could initiate trance with goddesses from the other world, and stand a fighting chance on the battlefield.\nA civilian named Yoshichika Tsurugi, who lacked \'Logic\' and lived happily with his family, was caught up in an attack, and took shelter along with many people. He meets a beautiful goddess named Athena. In her hands, she had the \'Logic\' that Yoshichika lacked. Now both Yoshichika and Athena head to their destiny.','chaptersNumber':13,'year':2014,'season':'spring','poster':'http://fs5.directupload.net/images/160309/rdncr8hn.jpg','backgroundImage':'http://vignette2.wikia.nocookie.net/luckandlogic/images/8/81/Luck_%26_Logic.png/revision/latest?cb=20151124082728','japaneseName':'ラクエンロジック','status':'finished','type':'serie','genres':[],'id':'56dfb6a9b4a5c01a0d22406c'},{'name':'Dagashi Kashi','synopsis':'El padre de Shikada Kokonotsu posee una tienda de dulces en una zona rural, y su plan es que sea su hijo quien se encargue del negocio familiar algún día. Sin embargo, lo que Kokonotsu quiere realmente es ser autor de manga.','chaptersNumber':15,'year':2014,'season':'spring','poster':'http://fs5.directupload.net/images/160309/3ky9mwsx.jpg','backgroundImage':'http://orig04.deviantart.net/2313/f/2016/014/d/2/hotaru_shidare_wallpaper_2_by_sanoboss-d9nya62.jpg','japaneseName':'だがしかし','status':'ongoing','type':'serie','genres':[],'id':'56dfb6edb4a5c01a0d22406d'},{'name':'Nombre para testear app animeBeat','synopsis':'test','chaptersNumber':12,'year':2014,'season':'autumn','poster':'http://oi64.tinypic.com/15daxci.jpg','backgroundImage':'http://orig04.deviantart.net/2313/f/2016/014/d/2/hotaru_shidare_wallpaper_2_by_sanoboss-d9nya62.jpg','japaneseName':'tesjap','status':'ongoing','type':'ova','genres':[],'id':'56e24891760d7a2a11321925'},{'name':'name','synopsis':'sdmasd','chaptersNumber':19,'year':2014,'season':'summer','poster':'http://fs5.directupload.net/images/160309/wvobu5i6.jpg','backgroundImage':'imag','trailer':'traierl','japaneseName':'dmasdm','studioId':'5743d2fae93b9c1a4c693028','status':'ongoing','type':'serie','genres':['Romance','Ecchi','Mecha','Fantasía'],'groupId':'1','id':'5754ba731631dc7c0266054c'},{'name':'tes','synopsis':'tes','chaptersNumber':123,'year':2016,'season':'spring','poster':'http://fs5.directupload.net/images/160309/3ky9mwsx.jpg','backgroundImage':'tes','japaneseName':'tess','studioId':'5743d302e93b9c1a4c693029','status':'ongoing','type':'serie','genres':['Romance','Ecchi'],'id':'5760d7d15f128c4461491c80'}];
    $scope.series2 = [{'name':'ona'},
                     {'name':'opa'},
                     {'name':'uni'},
                     {'name':'tear'},
                     {'name':'qw'},
                     {'name':'hotaru_shidare_wallpaper_2_by_sanoboss-d9nya62'},
                     {'name':'asd'},
                     {'name':'fqw'},
                     {'name':'asdqw2'},
                     {'name':'32'},
                     {'name':'t1'},
                     {'name':'sd'}];

  }

  angular.module('test').controller('TestCtrl', [
    '$scope',
    '$http',
    TestCtrl
  ]);
})();