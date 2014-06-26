/*========================================================================
      @作者：hugohua
      @说明：import
      @最后编辑：$Author:: hugohua           $
                 $Date:: 2014-29-20 下午5:29#$
========================================================================*/
(function(Pat){

    var $uploadCnt = $('#J_uploadCnt'),
        $upload = $('#J_upload');

    var RestApi = Pat.RestApi,
        Fun = Pat.Fun;

    /**
     * 初始化上传模块
     * @param id
     * @param folder
     */
    var upload = function(id,folder){
        new qq.FileUploader({							//上传对象
            element: document.getElementById(id),
            action: 'api/fileuploader.php',
            params:{
                folder:folder,
                newname: true
            },
            onComplete: function(id, fileName, responseJSON){
                if(!responseJSON.error){
                    console.info(responseJSON);
                    $uploadCnt.show();
                    $upload.hide();
                    RestApi.unzip(responseJSON.filename).done(function(data){
                        Fun.setDbData(data.jdpat,'#J_uploadCnt');
                        Fun.setUrlParam('id',data.jdpat.jdpat_id);
                        $('#J_path').val( Pat.config.publishUrl + data.jdpat.jdpat_id + '.html');
                    })
                }
            }
        })
    };

    var submitForm = function(){
        $('#J_uploadForm').on('submit',function(){
            var id = +Fun.getUrlParam('id'),
                data;
            if(!id) return false;

            data = {
                jdpat:Fun.getDbData('#J_uploadCnt')
            };
            data.jdpat.jdpat_id = id;
            RestApi.putPatById(data).done(function(d){
                if(d && d.jdpat && d.jdpat.jdpat_id){
                    alert('活动导入成功！');
                }
            });
            return false;
        });
    };

    var initPat = function(){
        var id = +Fun.getUrlParam('id');
        if(!id) return;
        RestApi.getPatById(id).done(function(data){
            if(data && data.jdpat){
                Fun.setDbData(data.jdpat,'#J_uploadCnt');
                $uploadCnt.show();
                $upload.hide();
            }
        })
    };

    var toggleAdv = function(){
        var $btn = $('#J_uploadAdvBtn'),
            $adv = $('#J_uploadAdv');
        $btn.on('click',function(){
            $adv.toggle();
            return false;
        })
    };





    var init = function(){
        initPat();
        upload('J_upload','../zip/');
        submitForm();
        toggleAdv();
    };

    init();

})(Pat);