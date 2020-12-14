window.onload = function() {
    // 待機(1000ms)
    setTimeout(function() {
        //1リツイートに対しクリックに対するイベント(=自動いいね)の回数を1回までに制限するためのカウンタ
        var rtandFavCount = false;
        // 対象とするノードの取得 (引用リツイートのエレメントはid='layers'直下に生成される)
        const observeTarget = document.querySelector('div#layers');
        // オブザーバインスタンスの作成
        const observer = new MutationObserver(mutationRecords => {
            for (mutationRecord of mutationRecords) {
                // 生成されるまで待つ(100ms)
                setTimeout(function() {
                    // mutationRecordオブジェクトのtarget内からツイートボタンを取得
                    const tweetButton = mutationRecord['target'].querySelector('div[data-testid="tweetButton"]');
                    // ツイートボタンの存在をチェック
                    if (tweetButton !== null) {
                        // ツイートボタンをクリック
                        tweetButton.click();
                        // フラグを立てる
                        rtandFavCount = true;
                    }
                }, 100);
            }
        });
        //クリックされたときに発生するイベント
        $(document).click(function(event){
            // クリックした対象のノードを取得
            var target = event.target;
            // 待機(100ms)
            setTimeout(function() {
                // リツイートの直後でかつ自動クリックの直後ではないとき
                if(rtandFavCount == true && target !== likeButton){
                    // フラグを解除
                    rtandFavCount = false;
                    // tweet-action-buttonsの要素を取得
                    var rtFav = target.closest('.css-1dbjc4n.r-18u37iz.r-1wtj0ep.r-psjefw.r-1mdbhws');
                    // 該当ツイートのいいねボタンを取得
                    var likeButton = rtFav.querySelector('div[data-testid="like"]');
                    // いいねボタンの存在をチェック
                    if(likeButton !==null){
                        // いいねボタンをクリック
                        likeButton.click();
                    }
                }
            }, 100); 
        });
        // オブザーバの設定
        const config = {childList: true};
        // 対象ノード(observeTarget)とオブザーバ設定(子要素生成の監視)を渡す
        observer.observe(observeTarget, config);
    }, 1000);
}