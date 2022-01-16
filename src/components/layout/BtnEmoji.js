import React, {Component} from "react";
import Picker, { SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react";
import 'emoji-picker-react/dist/main.css';
import '../../assets/css/filehidden.css'
import $ from 'jquery';

class BtnEmoji extends Component {
    showViewEmoji =(event)=>{
        if($('#contentEmoji').css('display')=='none'){
            $('#contentEmoji').show(200);
        }else{
            $('#contentEmoji').hide(200);
        }
    }
    render(){return(
        <React.Fragment>{this.showViewEmoji}
            <div id="contentEmoji" className="emojiContent" style={{display:'none'}}>
                <Picker
                onEmojiClick={this.onEmojiClick}
                disableAutoFocus={true}
                skinTone={SKIN_TONE_MEDIUM_DARK}
                groupNames={{ smileys_people: "PEOPLE" }}
                native
                />
            </div>
            <button type="button" onClick={(e)=>{this.showViewEmoji(e)}} id="emojioneArea" className="btn btn-link text-decoration-none font-size-16 btn-lg waves-effect" data-toggle="tooltip" data-placement="top" title="Emoji">
                                            <i className="ri-emotion-happy-line fa-1x"></i>
                                        </button>
        </React.Fragment>);
    }

}
export default BtnEmoji;