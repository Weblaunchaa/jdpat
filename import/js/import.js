/*========================================================================
      @作者：hugohua
      @说明：import
      @最后编辑：$Author:: hugohua           $
                 $Date:: 2014-29-20 下午5:29#$
========================================================================*/
(function(){

    var upload = function(id,folder){
        new qq.FileUploader({							//上传对象
            element: document.getElementById(id),
            action: 'api/fileuploader.php',
            params:{
                folder:folder
            },
            onComplete: function(id, fileName, responseJSON){
                if(!responseJSON.error){
                    console.info(responseJSON)
                }
            }
        })
    };

    var init = function(){
        upload('J_upload','../zip/');
    };

    init();

})();