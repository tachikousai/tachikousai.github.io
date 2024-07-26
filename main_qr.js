function canvas() {
    $('canvas').attr('id', 'canvas'); //canvasにidをつける
};

function hidden() {
    $('#op-qrcode').empty(); //#op-qrcodeの子要素削除
};

$('#make').on('click', function () { //makeボタンが押された場合の処理
    var input1 = $('#liveArea').val(); //テキストを取得


    var input2 = $('#numPeopleElementary').val(); //テキストを取得
    var input3 = $('#numPeopleJhs').val(); //テキストを取得
    var input4 = $('#numPeopleObOg').val(); //テキストを取得
    var input5 = $('#numPeopleObOgParents').val(); //テキストを取得
    var input6 = $('#numPeopleNear').val(); //テキストを取得
    var input7 = $('#numPeopleInvolved').val(); //テキストを取得
    var input8 = $('#numPeopleOther').val(); //テキストを取得


    var input9 = $('#reason1').prop('checked'); //テキストを取得
    var input10 = $('#reason2').prop('checked'); //テキストを取得
    var input11 = $('#reason3').prop('checked'); //テキストを取得
    var input12 = $('#reason4').prop('checked'); //テキストを取得
    var input13 = $('#reason5').prop('checked'); //テキストを取得
    var input14 = $('#reason6').prop('checked'); //テキストを取得


    if (input1 == "000000") {
        alert("お住まいの地域を選択してください");
    } else if (input2 == "0" && input3 == "0" && input4 == "0" && input5 == "0" && input6 == "0" && input7 == "0" && input8 == "0") {
        alert("来場される方の人数を入力してください");
    } else {

        hidden(); //二回目にmakeがクリックされた場合の処理


        var inputStr = "";

        for (i = 1; i < 15; i++) {
            inputName = String("input" + String(i));

            addStr = String(eval(inputName));

            if (addStr == "true") {
                addStr = "1";
            } else if (addStr == "false") {
                addStr = "0";
            }

            inputStr = inputStr + addStr + ",";
        }


        var size = 600; //サイズを取得
        var text = unescape(encodeURIComponent(inputStr));//日本語対応
        $('#qrcode').qrcode({ text: text, width: size, height: size, correctLevel: 1 });

        // canvas要素を非表示にする
        const canvas = document.querySelector('#qrcode canvas');
        canvas.style.display = 'none';

        // 新しいcanvasを作成してQRと画像を描画する
        const combinedCanvas = document.createElement('canvas');
        const combinedContext = combinedCanvas.getContext('2d');
        const img = document.getElementById('newImg');

        // 画像のサイズを調整するためのパラメータ
        const logoWidthRatio = 1.00;  // 画像の幅を元のhoge%にする
        const logoHeightRatio = 1.00; // 画像の高さを元のhoge%にする

        // QRと画像の周りの余白
        const padding = 50;  // 余白のサイズ

        // QRの描画が完了した後に実行する
        setTimeout(() => {
            const qrCodeCanvas = document.querySelector('#qrcode canvas');
            const qrCodeWidth = qrCodeCanvas.width;
            const qrCodeHeight = qrCodeCanvas.height;

            // 新しいcanvasのサイズを設定
            const logo = new Image();
            logo.src = 'images/tachikousai.png';
            logo.onload = () => {
                const originalLogoWidth = logo.width;
                const originalLogoHeight = logo.height;
                const logoWidth = originalLogoWidth * logoWidthRatio;
                const logoHeight = originalLogoHeight * logoHeightRatio;

                combinedCanvas.width = qrCodeWidth + padding * 2;
                combinedCanvas.height = qrCodeHeight + logoHeight + padding * 3;

                // 背景を白に設定
                combinedContext.fillStyle = "#ffffff";
                combinedContext.fillRect(0, 0, combinedCanvas.width, combinedCanvas.height);

                // QRを描画
                combinedContext.drawImage(qrCodeCanvas, padding, padding);

                // QRの下に画像を描画
                combinedContext.drawImage(logo, (combinedCanvas.width - logoWidth) / 2, qrCodeHeight + padding * 2, logoWidth, logoHeight);

                // combinedCanvasを画像に変換
                const dataURL = combinedCanvas.toDataURL('image/png');

                // img要素にデータURLを設定
                img.src = dataURL;

                date = new Date()

                const imgDownloadName = "tachikousai_" + date.toLocaleString() + ".png";

                // ダウンロードリンクも設定
                const dlLink = document.getElementById('dlImg');
                dlLink.href = dataURL;
                dlLink.download = imgDownloadName;
                dlLink.style.display = "block"
            };
        }, 100);  // 1秒待つ


        const hideView1 = document.getElementById("qr_edit");
        hideView1.style.display = "none";

        const hideView2 = document.getElementById("introTextBefore");
        hideView2.style.display = "none";

        const makeButton = document.getElementById("make");
        makeButton.style.display = "none"

        const displayView = document.getElementById("introTextAfter");
        displayView.style.display = "block"

        const imgFrame = document.getElementById("newImg");
        imgFrame.style.display = "inline"

    }

});