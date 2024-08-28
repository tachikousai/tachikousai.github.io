function canvas() {
    $('canvas').attr('id', 'canvas'); //canvasにidをつける
};

function hidden() {
    $('#op-qrcode').empty(); //#op-qrcodeの子要素削除
};

$('#make').on('click', function () { //makeボタンが押された場合の処理
    var input1 = $('#liveArea').val(); //テキストを取得

    var input2 = $('#numPeopleObOgParents').val(); //テキストを取得
    var input3 = $('#numPeopleObOg').val(); //テキストを取得
    var input4 = $('#numPeopleElementary').val(); //テキストを取得
    var input5 = $('#numPeopleJhs').val(); //テキストを取得
    var input6 = $('#numPeopleNear').val(); //テキストを取得
    var input7 = $('#numPeopleInvolved').val(); //テキストを取得
    var input8 = $('#numPeopleOther').val(); //テキストを取得

    var input9 = $('#reason1').prop('checked'); //テキストを取得
    var input10 = $('#reason2').prop('checked'); //テキストを取得
    var input11 = $('#reason3').prop('checked'); //テキストを取得
    var input12 = $('#reason4').prop('checked'); //テキストを取得
    var input13 = $('#reason5').prop('checked'); //テキストを取得
    var input14 = $('#reason6').prop('checked'); //テキストを取得
    var input15 = $('#reason7').prop('checked'); //テキストを取得

    if (input1 == "000000") {
        alert("お住まいの市区町村を選択してください");
    } else if (input2 == "0" && input3 == "0" && input4 == "0" && input5 == "0" && input6 == "0" && input7 == "0" && input8 == "0") {
        alert("入場される方の人数を入力してください");
    } else {

        hidden(); //二回目にmakeがクリックされた場合の処理

        var inputStr = "";

        for (inputCount = 1; inputCount < 16; inputCount++) {
            inputName = String("input" + String(inputCount));

            addStr = String(eval(inputName));

            if (addStr == "true") {
                addStr = "1";
            } else if (addStr == "false") {
                addStr = "0";
            }

            inputStr = inputStr + addStr + ",";
        }

        let date = new Date();
        let day = date.getDate().toString().padStart(2, "0");
        let hour = date.getHours().toString().padStart(2, "0");
        let minute = date.getMinutes().toString().padStart(2, "0");


        inputStr = inputStr + day + "," + hour + "," + minute;


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

        // QRと画像の周りの余白
        const padding = 50;  // 余白のサイズ

        // 背景画像をロード
        const backgroundImage = new Image();
        backgroundImage.src = 'images/background.jpg'; // 背景画像のパス
        backgroundImage.onload = () => {
            // QRコードを取得して白を透明にする処理
            const qrCodeCanvas = document.querySelector('#qrcode canvas');
            const qrCodeContext = qrCodeCanvas.getContext('2d');
            const qrCodeImageData = qrCodeContext.getImageData(0, 0, qrCodeCanvas.width, qrCodeCanvas.height);
            const qrCodeData = qrCodeImageData.data;

            for (let i = 0; i < qrCodeData.length; i += 4) {
                if (qrCodeData[i] === 255 && qrCodeData[i + 1] === 255 && qrCodeData[i + 2] === 255) {
                    qrCodeData[i + 3] = 0; // アルファ値を0に設定（透明）
                }
            }
            qrCodeContext.putImageData(qrCodeImageData, 0, 0);

            const logo = new Image();//裏の文字と重なって見ずらいので廃止
            logo.src = 'images/tachikousai.png'; // QRコードの下に表示する画像
            logo.onload = () => {
                const originalLogoWidth = logo.width;
                const originalLogoHeight = logo.height;
                const logoWidthRatio = 1.00;  // 画像の幅を元のサイズの100%にする
                const logoHeightRatio = 1.00; // 画像の高さを元のサイズの100%にする

                const logoWidth = originalLogoWidth * logoWidthRatio;
                const logoHeight = originalLogoHeight * logoHeightRatio;

                combinedCanvas.width = qrCodeCanvas.width + padding * 2;
                combinedCanvas.height = qrCodeCanvas.height + logoHeight + padding * 3;

                // 背景画像を描画
                combinedContext.globalAlpha = 0; // 透過度を設定
                combinedContext.drawImage(backgroundImage, 0, 0, combinedCanvas.width, combinedCanvas.height);

                // QRコードを描画
                combinedContext.globalAlpha = 1.0; // 透過度を元に戻す
                combinedContext.drawImage(qrCodeCanvas, padding, padding);

                // 画像を取得して白を透明にする処理
                const logoCanvas = document.createElement('canvas');
                logoCanvas.width = logoWidth;
                logoCanvas.height = logoHeight;
                const logoContext = logoCanvas.getContext('2d');
                logoContext.drawImage(logo, 0, 0, logoWidth, logoHeight);

                const logoImageData = logoContext.getImageData(0, 0, logoCanvas.width, logoCanvas.height);
                const logoData = logoImageData.data;

                for (let i = 0; i < logoData.length; i += 4) {
                    if (logoData[i] === 255 && logoData[i + 1] === 255 && logoData[i + 2] === 255) {
                        logoData[i + 3] = 0; // アルファ値を0に設定（透明）
                    }
                }
                logoContext.putImageData(logoImageData, 0, 0);

                // QRの下に画像を描画
                combinedContext.drawImage(logoCanvas, (combinedCanvas.width - logoWidth) / 2, qrCodeCanvas.height + padding * 2, logoWidth, logoHeight);

                // combinedCanvasを画像に変換
                const dataURL = combinedCanvas.toDataURL('image/png');

                // img要素にデータURLを設定
                img.src = dataURL;

                date = new Date();

                const imgDownloadName = "tachikousai_" + date.toLocaleString() + ".png";

                // ダウンロードリンクも設定
                const dlLink = document.getElementById('dlImg');
                dlLink.href = dataURL;
                dlLink.download = imgDownloadName;
                dlLink.style.display = "block";
            };
        };

        const hideView1 = document.getElementById("qr_edit");
        hideView1.style.display = "none";

        const hideView2 = document.getElementById("introTextBefore");
        hideView2.style.display = "none";

        const makeButton = document.getElementById("make");
        makeButton.style.display = "none";

        const displayView = document.getElementById("introTextAfter");
        displayView.style.display = "block";

        const imgFrame = document.getElementById("newImg");
        imgFrame.style.display = "inline";

    }

});