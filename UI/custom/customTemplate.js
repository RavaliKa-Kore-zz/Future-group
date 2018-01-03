function customTemplate(data) {
	this.cfg = data;
	this.helpers = null;
	this.extension = null;
}

/**
 * purpose: Function to render bot message for a given custom template
 * input  : Bot Message
 * output : Custom template HTML
 */
 var carouselAdvTemplateCount = 0;
 var carouselEles = [];
customTemplate.prototype.renderMessage = function (msgData) {
	// For your reference sample code snippet given below
	var messageHtml = '';
	if (msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.template_type == "ListTemplateDisable") {
		messageHtml = $(this.getChatTemplate("modListTemplate")).tmpl({
                'msgData': msgData,
                'helpers': this.helpers,
                'extension': this.extension
            });
        $('.list_disable_btn').on('click', '.RemoveBtn', function (event) {
            console.log("<><><><><");
        });
	} 
    else if (msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.template_type == "carouselAdv") {
                messageHtml = $(this.getChatTemplate("carouselTemplateAdv")).tmpl({
                    'msgData': msgData,
                    'helpers': this.helpers,
                    'extension': this.extension
                });
                setTimeout(function () {
                    $('.carousel:last').addClass("carousel"+carouselAdvTemplateCount);
                    var count = $(".carousel"+carouselAdvTemplateCount).children().length;
                    if(count > 1) {
                        var carouselOneByOne = new PureJSCarousel({
                            carousel: '.carousel'+carouselAdvTemplateCount,
                            slide: '.slide',
                            oneByOne: true
                          });
                         $('.carousel'+carouselAdvTemplateCount).parent().show();
                         $('.carousel'+carouselAdvTemplateCount).attr('style', 'height: 100% !important');
                         carouselEles.push(carouselOneByOne);
                    }
                    //window.dispatchEvent(new Event('resize'));
                    var evt = document.createEvent("HTMLEvents");
                     evt.initEvent('resize', true, false);
                     window.dispatchEvent(evt);
                    carouselAdvTemplateCount += 1;
                    _chatContainer.animate({
                        scrollTop: _chatContainer.prop("scrollHeight")
                    }, 0);
                });
    }
	return messageHtml;

	//End of reference snippet code*/

   //return "";	
}; // end of renderMessage method


 /**
 * purpose: Function to get custom template HTML
 * input  : Template type
 * output : Custom template HTML
 *
 */
 
customTemplate.prototype.getChatTemplate = function(tempType) {
	//For your reference sample code snippet given below
	var AdvListTemplate = '<script id="chat_message_tmpl" type="text/x-jqury-tmpl"> \
            {{if msgData.message}} \
                <li {{if msgData.type !== "bot_response"}}id="msg_${msgItem.clientMessageId}"{{/if}} class="list_disable_btn {{if msgData.type === "bot_response"}}fromOtherUsers{{else}}fromCurrentUser{{/if}} with-icon"> \
                    <div class="listTmplContent"> \
                        {{if msgData.createdOn}}<div class="extra-info">${helpers.formatDate(msgData.createdOn)}</div>{{/if}} \
                        {{if msgData.icon}}<div class="profile-photo"> <div class="user-account avtar" style="background-image:url(${msgData.icon})"></div> </div> {{/if}} \
                        <ul class="listTmplContentBox"> \
                            {{if msgData.message[0].component.payload.title || msgData.message[0].component.payload.heading}} \
                                <li class="listTmplContentHeading"> \
                                    {{if msgData.type === "bot_response" && msgData.message[0].component.payload.heading}} {{html helpers.convertMDtoHTML(msgData.message[0].component.payload.heading, "bot")}} {{else}} {{html helpers.convertMDtoHTML(msgData.message[0].component.payload.text, "user")}} {{/if}} \
                                    {{if msgData.message[0].cInfo && msgData.message[0].cInfo.emoji}} \
                                        <span class="emojione emojione-${msgData.message[0].cInfo.emoji[0].code}">${msgData.message[0].cInfo.emoji[0].title}</span> \
                                    {{/if}} \
                                </li> \
                            {{/if}} \
                            {{each(key, msgItem) msgData.message[0].component.payload.elements}} \
                                {{if msgData.message[0].component.payload.buttons}} \
                                    {{if key<= 2 }}\
                                        <li class="listTmplContentChild"> \
                                            {{if msgItem.image_url}} \
                                            <div class="listRightContent"> \
                                                <img src="${msgItem.image_url}" /> \
                                            </div> \
                                            {{/if}} \
                                            <div class="listLeftContent"> \
                                                <div class="listItemTitle">{{if msgData.type === "bot_response"}} {{html helpers.convertMDtoHTML(msgItem.title, "bot")}} {{else}} {{html helpers.convertMDtoHTML(msgItem.title, "user")}} {{/if}}</div> \
                                                {{if msgItem.subtitle}}<div class="listItemSubtitle">{{if msgData.type === "bot_response"}} {{html helpers.convertMDtoHTML(msgItem.subtitle, "bot")}} {{else}} {{html helpers.convertMDtoHTML(msgItem.subtitle, "user")}} {{/if}}</div>{{/if}} \
                                                {{if msgItem.default_action}}<div class="listItemPath" type="url" url="${msgItem.default_action.url}">${msgItem.default_action.url}</div>{{/if}} \
                                                {{if msgItem.buttons}}\
                                                <div> \
                                                    <span class="buyBtn RemoveBtn" {{if msgItem.buttons[0].type}}type="${msgItem.buttons[0].type}"{{/if}} {{if msgItem.buttons[0].url}}url="${msgItem.buttons[0].url}"{{/if}} {{if msgItem.buttons[0].payload}}value="${msgItem.buttons[0].payload}"{{/if}}>{{if msgItem.buttons[0].title}}${msgItem.buttons[0].title}{{else}}Buy{{/if}}</span> \
                                                </div> \
                                                {{/if}}\
                                            </div>\
                                        </li> \
                                    {{/if}}\
                                {{else}} \
                                    <li class="listTmplContentChild"> \
                                        {{if msgItem.image_url}} \
                                        <div class="listRightContent"> \
                                            <img src="${msgItem.image_url}" /> \
                                        </div> \
                                        {{/if}} \
                                        <div class="listLeftContent"> \
                                            <div class="listItemTitle">{{if msgData.type === "bot_response"}} {{html helpers.convertMDtoHTML(msgItem.title, "bot")}} {{else}} {{html helpers.convertMDtoHTML(msgItem.title, "user")}} {{/if}}</div> \
                                            {{if msgItem.subtitle}}<div class="listItemSubtitle">{{if msgData.type === "bot_response"}} {{html helpers.convertMDtoHTML(msgItem.subtitle, "bot")}} {{else}} {{html helpers.convertMDtoHTML(msgItem.subtitle, "user")}} {{/if}}</div>{{/if}} \
                                            {{if msgItem.default_action}}<div class="listItemPath" type="url" url="${msgItem.default_action.url}">${msgItem.default_action.url}</div>{{/if}} \
                                            {{if msgItem.buttons}}\
                                            <div> \
                                                <span class="buyBtn RemoveBtn" {{if msgItem.buttons[0].type}}type="${msgItem.buttons[0].type}"{{/if}} {{if msgItem.buttons[0].url}}url="${msgItem.buttons[0].url}"{{/if}} {{if msgItem.buttons[0].payload}}value="${msgItem.buttons[0].payload}"{{/if}}>{{if msgItem.buttons[0].title}}${msgItem.buttons[0].title}{{else}}Buy{{/if}}</span> \
                                            </div> \
                                            {{/if}}\
                                        </div>\
                                    </li> \
                                {{/if}} \
                            {{/each}} \
                            </li> \
                            {{if msgData.message[0].component.payload.elements.length > 3 && msgData.message[0].component.payload.buttons}}\
                            <li class="viewMoreList"> \
                                <span class="viewMore" url="{{if msgData.message[0].component.payload.buttons[0].url}}${msgData.message[0].component.payload.buttons[0].url}{{/if}}" type="${msgData.message[0].component.payload.buttons[0].type}" value="{{if msgData.message[0].component.payload.buttons[0].payload}}${msgData.message[0].component.payload.buttons[0].payload}{{else}}${msgData.message[0].component.payload.buttons[0].title}{{/if}}">${msgData.message[0].component.payload.buttons[0].title}</span> \
                            </li> \
                            {{/if}}\
                        </ul> \
                    </div> \
                </li> \
            {{/if}} \
        </script>';
        var carouselTemplateAdv = '<script id="chat_message_tmpl" type="text/x-jqury-tmpl"> \
            {{if msgData.message}} \
                <li {{if msgData.type !== "bot_response"}}id="msg_${msgItem.clientMessageId}"{{/if}} class="{{if msgData.type === "bot_response"}}fromOtherUsers{{else}}fromCurrentUser{{/if}} with-icon"> \
                    {{if msgData.createdOn}}<div class="extra-info">${helpers.formatDate(msgData.createdOn)}</div>{{/if}} \
                    {{if msgData.icon}}<div class="profile-photo extraBottom"> <div class="user-account avtar" style="background-image:url(${msgData.icon})"></div> </div> {{/if}} \
                    {{if msgData.message[0].component.payload.text}} \
                    <div class="messageBubble"> \
                        {{if msgData.type === "bot_response"}} {{html helpers.convertMDtoHTML(msgData.message[0].component.payload.text, "bot")}} {{else}} {{html helpers.convertMDtoHTML(msgData.message[0].component.payload.text, "user")}} {{/if}} \
                        {{if msgData.message[0].cInfo && msgData.message[0].cInfo.emoji}} \
                        <span class="emojione emojione-${msgData.message[0].cInfo.emoji[0].code}">${msgData.message[0].cInfo.emoji[0].title}</span> \
                    {{/if}} \
                    </div>\
                    {{/if}} \
                    <div class="carousel" id="carousel-one-by-one" style="height: 0px;">\
                        {{each(key, msgItem) msgData.message[0].component.payload.elements}} \
                            <div class="slide">\
                                {{if msgItem.image_url}} \
                                    <div class="carouselImageContent" {{if msgItem.default_action && msgItem.default_action.url}}url="${msgItem.default_action.url}"{{/if}} {{if msgItem.default_action && msgItem.default_action.title}}data-value="${msgItem.default_action.title}"{{/if}} {{if msgItem.default_action && msgItem.default_action.type}}type="${msgItem.default_action.type}"{{/if}} {{if msgItem.default_action && msgItem.default_action.payload}} value="${msgItem.default_action.payload}"{{/if}}> \
                                    <div class="Card-banner top-right">{{if msgItem.cost_price}}<strike>{{html helpers.convertMDtoHTML(msgItem.price, "bot")}}</strike> {{html helpers.convertMDtoHTML(msgItem.cost_price, "bot")}}{{else}}{{html helpers.convertMDtoHTML(msgItem.price, "bot")}}{{/if}}</div>\
                                        <img src="${msgItem.image_url}" /> \
                                   {{if msgItem.saved_price}}<div class="Card-banner bottom-left">{{html helpers.convertMDtoHTML(msgItem.saved_price, "bot")}}</div>{{/if}}\
                                    </div> \
                                {{/if}} \
                                <div class="carouselTitleBox"> \
                                    <p class="carouselTitle">{{if msgData.type === "bot_response"}} {{html helpers.convertMDtoHTML(msgItem.title, "bot")}} {{else}} {{html helpers.convertMDtoHTML(msgItem.title, "user")}} {{/if}}</p> \
                                    {{if msgItem.subtitle}}<p class="carouselDescription truncate">{{if msgData.type === "bot_response"}} {{html helpers.convertMDtoHTML(msgItem.subtitle, "bot")}} {{else}} {{html helpers.convertMDtoHTML(msgItem.subtitle, "user")}} {{/if}}</p>{{/if}} \
                                    {{if msgItem.default_action && msgItem.default_action.type === "web_url"}}<div class="listItemPath carouselDefaultAction" type="url" url="${msgItem.default_action.url}">${msgItem.default_action.url}</div>{{/if}} \
                                    {{if msgItem.buttons}} \
                                        {{each(key, msgBtn) msgItem.buttons}} \
                                            <div {{if msgBtn.payload}}value="${msgBtn.payload}"{{/if}} {{if msgBtn.url}}url="${msgBtn.url}"{{/if}} class="listItemPath carouselButton" data-value="${msgBtn.value}" type="${msgBtn.type}">\
                                                ${msgBtn.title}\
                                            </div> \
                                        {{/each}} \
                                    {{/if}} \
                                </div>\
                            </div>\
                        {{/each}} \
                    </div>\
                </li> \
            {{/if}}\
        </scipt>';
        if(tempType === "modListTemplate"){
            return AdvListTemplate;
        } else if(tempType === "carouselTemplateAdv"){
            return carouselTemplateAdv;
        }
        else {
            return "";
    }
}; // end of getChatTemplate method