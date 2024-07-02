// 自行填寫
var skillId = "******************************";
var url = "******************************";
var apikey = "******************************";

//選填
var assistantName = "Assistant";

// 不用管他
var context = {};

$(function() {
    
    // 輪播物件初始化
    // $('.msg-carousel').slick({
    //     // 無限滾動
    //     infinite: true,
    //     // RWD 輪播個數變動
    //     responsive: [
    //         {
    //           breakpoint: 2000,
    //           settings: {
    //             slidesToShow: 3,
    //           }
    //         },
    //         {
    //           breakpoint: 1280,
    //           settings: {
    //             slidesToShow: 2,
    //           }
    //         },
    //         {
    //           breakpoint: 768,
    //           settings: {
    //             slidesToShow: 1,
    //           }
    //         }
    //     ]
    // });

    // 偵測新增物件(最外層)
    $('body').on('DOMNodeInserted', '.group-rom', function (e) {
        let carouselObj = $(this).find('.msg-carousel').not('.slick-initialized');
        if(carouselObj.length != 0) {
            $(this).find('.msg-carousel').slick({
                infinite: true,
                responsive: [
                    {
                        breakpoint: 2000,
                        settings: {
                            slidesToShow: 3,
                        }
                    },
                    {
                        breakpoint: 1280,
                        settings: {
                            slidesToShow: 2,
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 1,
                        }
                    }
                ]
            });
        }
    });

    AssistantSay("你好，請問有什麼可以為您服務的地方嗎");

    /**
     * 按下 Enter 發話
     */
    $(document).on('keypress',(e) => {
        if(e.which == 13) {
            talk();
        }
    });

}());

function talk() {

    // 取得對話內容
    var chat = $(".chat-txt input").val();

    // 無對話不動作
    if(!chat) return;

    // 你說話
    youSay(chat);
    // 清空輸入框
    $(".chat-txt input").val("");

    // 忽略流程，這邊已經拿到答案包 
    const answerpack = getRandomResponse();
    for(msg of answerpack.messages) {
        AssistantSay(msg);
    }
    
}

/**
 * 產生對話方塊
 * @param {string} msg 
 */
function youSay(msg) {
    $(".chat-room-content").append(`
    <div class="group-rom">
        <div class="first-part odd">You</div>
        <div class="second-part">${msg}</div>
        <div class="third-part">${new Date(Date.now()).toLocaleString('zh-Hans-CN')}</div>
    </div>`);

    // 自動捲動
    $('.chat-room-content').scrollTo($(this).height());
}

function AssistantSay(msg) {
    if(typeof msg === 'string') {
        msg = {
            type: 'text',
            value: msg
        }
    }

    let msgHtml;

    switch(msg.type) {
        case 'carousel':
            msgHtml = buildCarouselMessage(msg);
            break;
        
        case 'text':
        case 'image':
        case 'video':
        case 'file':
        case '...':
        default: 
            msgHtml = buildTextMessage(msg);
            break
    }

    if(msgHtml) {
        $(".chat-room-content").append(msgHtml);
    
        // 自動捲動
        $('.chat-room-content').scrollTo($(this).height());
    }

    function buildTextMessage(msg) {
        return `
        <div class="group-rom">
            <div class="first-part">${assistantName}</div>
            <div class="second-part">${msg.value}</div>
            <div class="third-part">${new Date(Date.now()).toLocaleString('zh-Hans-CN')}</div>
        </div>`
    }

    function buildCarouselMessage(msg) {
        return `
        <div class="group-rom">
            <div class="first-part">${assistantName}</div>
            <div class="second-part">
                <div class="msg-carousel">${msg.value.map(template => `
                    <div class="template">
                        <div class="card">
                            ${template.image ? `
                            <div class="card-header">
                                <img class="header-image" src="${template.image}" alt="">
                            </div>` : ''}
                            ${(template.title || template.text) ? `
                            <div class="card-body">
                                ${template.title ? `
                                <h5 class="card-title">${template.title}</h5>` : ''}
                                ${template.text ? `
                                <p class="card-text">${template.text}</p>` : ''}
                            </div>`: ''}
                            ${template.buttons.length > 0 ? `
                            <div class="card-footer">
                                <div class="button-container d-flex">
                                    <div class="button-column">
                                        ${template.buttons.map(button => 
                                        `<button class="btn btn-outline-primary" type="button">${button.label}</button>`).join('')}
                                    </div>
                                </div>
                            </div>` : ''}
                        </div>
                    </div>`
                ).join('')}</div>
            </div>
            <div class="third-part">${new Date(Date.now()).toLocaleString('zh-Hans-CN')}</div>
        </div>`
    }
}

function getRandomResponse() {
    const responses = randomResponse();
    return responses[Math.round(Math.random() * (responses.length-1))]
}

function randomResponse() {
    return [{
        ansId: 'ANS-01',
        messages: [
            {
                type: 'carousel',
                value: [
                    {
                        image: 'https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg',
                        title: 'I am title 1',
                        text: 'hi here\'s some descriptions',
                        buttons: [{
                            label: 'Button 1',
                            type: 'url',
                            value: ''
                        }]
                    },
                    {
                        image: 'https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg',
                        title: 'I am title 2',
                        text: 'hi here\'s some descriptions YAYA',
                        buttons: [{
                            label: 'Button 1',
                            type: 'url',
                            value: ''
                        }]
                    },
                    {
                        image: 'https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg',
                        title: 'I am title 3',
                        text: 'hi here\'s some descriptions ohohoh',
                        buttons: [{
                            label: 'Button 1',
                            type: 'url',
                            value: ''
                        }]
                    }
                ]
            }
        ]

    }, {
        ansId: 'ANS-02',
        messages: [{
            type: 'text',
            value: 'Hello'
        }]

    // }, {
    //     ansId: 'ANS-03',
    //     messages: []

    // }, {
    //     ansId: 'ANS-04',
    //     messages: []

    // }, {
    //     ansId: 'ANS-05',
    //     messages: [
    //         {
    //             type: 'carousel',
    //             value: [
    //                 {
    //                     image: '',
    //                     title: '',
    //                     text: '',
    //                     buttons: [{
    //                     }]
    //                 }
    //             ]
    //         }
    //     ]

    }];
}