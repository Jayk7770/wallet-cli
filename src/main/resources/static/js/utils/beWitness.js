$(document).ready(function(){
    //btn 是否可点击
    $(".c_check input").on("click", function () {
        if ($(this).is(":checked")) {
            if($('.ord_input').val() != ''){
                $('.ord_btn').removeClass('disable_btn')
            } else {
                $('.ord_btn').addClass('disable_btn')
            }
        }else{
            $('.ord_btn').addClass('disable_btn')
        }
    })
    $('.ord_input').on('blur',function(){
        if($('.ord_input').val() != ''){
            if ($(".c_check input").is(":checked")) {
                $('.ord_btn').removeClass('disable_btn')
            }else {
                $('.ord_btn').addClass('disable_btn')
            }
        }else{
            $('.ord_btn').addClass('disable_btn')
        }
    })

    $('.ord_btn').on('click',function () {
        if(!$(".c_check input").is(":checked")){
            alert('请阅读见证人通知，并勾选')
        }else if($('.ord_input').val() == ''){
            alert('请输入您的个人站点')
        }else{
            createWitnessView()
        }
    })

    function createWitnessSuccess(data) {
        var transaction = getTransActionFromBase64String(data);
        var transactionSigned = signTransaction(com_priKeyBytes, transaction);
        var transactionBytes = transactionSigned.serializeBinary();
        var transactionString = byteArray2hexStr(transactionBytes);
        ajaxRequest("POST", anintran, transactionString, TransBroadSuccessCallback,
            TransBroadFailureCallback)

    }
    function createWitnessFail(error) {
        console.log(error)
    }
    createWitnessView =function() {
        var com_pri = window.localStorage.getItem('key');
        var onwerUrl = $('.ord_input').val();
        com_priKeyBytes = base64DecodeFromString(com_pri);
        var com_addressBytes = getAddressFromPriKey(com_priKeyBytes);
        var com_text = byteArray2hexStr(com_addressBytes);
        console.log(com_text)
        ajaxRequest( "post",createWitness,{'address':com_text,'onwerUrl':onwerUrl},createWitnessSuccess,createWitnessFail)
    }
     //验签成功
     function TransBroadSuccessCallback(data) {
            console.log(data)
            alert('申请成功');
            $('.ord_btn').css('display','none')
            $('.ord_suc').css('display','block')

     };

    function TransBroadFailureCallback(data) {
        console.log(data)
    }


});