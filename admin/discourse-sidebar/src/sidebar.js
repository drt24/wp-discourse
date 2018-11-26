/**
 * Internal block libraries
 */

const {__} = wp.i18n;

const {
    PluginSidebar,
    PluginSidebarMoreMenuItem
} = wp.editPost;

const {
    PanelBody,
    TextControl
} = wp.components;

const {
    Component,
    Fragment
} = wp.element;

const {withSelect} = wp.data;

const {compose} = wp.compose;

const {registerPlugin} = wp.plugins;

const el = wp.element.createElement;

// See: https://wp.zacgordon.com/2017/12/07/how-to-add-custom-icons-to-gutenberg-editor-blocks-in-wordpress/
const iconEl = el('img', {
    width: 20,
    height: 20,
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MUYxNjlGNkY3NjAxMTFFNjkyRkZBRTlDQTMwREJDQzUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MUYxNjlGNzA3NjAxMTFFNjkyRkZBRTlDQTMwREJDQzUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoxRjE2OUY2RDc2MDExMUU2OTJGRkFFOUNBMzBEQkNDNSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxRjE2OUY2RTc2MDExMUU2OTJGRkFFOUNBMzBEQkNDNSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pq7th6IAAAP8SURBVHjalFbbT5tlHH56grKWnicw5ijdAjNGg5CxbPGIM7qx7cIlxihxd7oLr/wHlpgsu/FWjbdeeOWFwUQixmW6GGbKpDKcgqhj7AA90CM9t/j8Xr+vKZW08Gue0O/jfZ/n/R3fGg73+dHE2ogzxEvEU4SPMBJxYon4kZjUnnc0QxOBD4j3iX40txjxKfEhUdqNwJPE58SwWmAwoFQqoVQsolqtwmgyoa2tDWazGVtbW/X7FokJYrb+pbGB/DliTsiNRiPyuRw2YjEY+HF7fejqOQCHw4FcNotoOKyEZZ1mg0SQeKWe0Fz3PUBck3cGCepGDE6XG8dOnIQ/cBgutwcmnrpcLiEaieB2KIRfgj+jnd54fT5UKhWdZ1oTW2oUmFTkDEl8Y4OkAbx69jwOPn5IhaO76zH0dHfB7Xaj3WpFMpXGt1Pf4KOrV7Fy9x/4+wMUL+tcX2sitRxckkQJeTIRRy9J35h4B06nEz6vFyPDQ/D3HYKJ8W+0UGgeFyfexh93fqeIv94TKZCPdYH7RK/EVBJ54c23MHD0CXXiU2MvorPT3rSM7q7cw8ljo8xZFr79+xUH7SFxUDL0gpDLm81MBkcGj6qY2237cOrl1uRi4t3lK1dQYojy+Zz++gAxJgJj8iQlJyHo6e1VZTgy/Aw67a3JdXvt9GmcePZ5hjihSlszJTAg38QtIXY4nHC5nAgE+rEX28fED42MwGazq/LVS1cEOvQn8UKEfCy7Dmv7ngTyhbyKv4coFAr6a58IqNqShimyW1OpJOx2G/ZqaZatgRxWelKt1ippq9aGErdKpYzVlRWeprBngYeP1lApVxSMhhptZNuosDGpfy0t4vr31+rruaWtcWys3n9AL5LIpFOwWCz6v37bJmC1dnBBGqG5ORRK5V2RS1hv3gyqA/29/CcS8Q20tdfyN10/Kv5rdYZq9Pgoq6J1ktPpDG78NIP1cASRSBi/3rrFsWJRHKyYZS6Z2SZQZOzFi7Pj402Js9kcVu6tYmHhDuLJJDY3M5ia/Arh9Udwe7z6GL/cOOwQjUVxZvwchoaeRjyRxPztBczOztKzCr06rhovzW6PcYTH2VClYkkNuh++m8Yyc+fkINTIZ4gv/icgwy3HeXLp3fcQDM5ifW1dzReLxYwjA4Po4wiRNSazCSkKPFhdxfLiIkOVgsvjUZVIgRSpXq+/0b7k3wvyINlPcGMkGoHD3qlq2sLulubLMgxym0kIhahYLCgPbDabGt/ayRPabJvf6cJRLS4bBI2mSCgk1SKTRkaCsdOoiDVy+QFwUYZr443Wvat6JImcXC6f+tGinfYT4rOdtsnqKSkMfWS0MIOGtEZ8g7jebMO/AgwANr2XXAf8LaoAAAAASUVORK5CYII="
});

const buttonClass = 'components-button is-button is-default is-primary is-large wpdc-button';
const activeButtonClass = 'components-button is-button is-default is-primary is-large wpdc-button active';
const downArrow = (<svg
    className={"components-panel__arrow"} width="24px" height="24px" viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true" focusable="false">
    <g>
        <path fill={"none"} d={"M0,0h24v24H0V0z"}/>
    </g>
    <g>
        <path d={"M7.41,8.59L12,13.17l4.59-4.58L18,10l-6,6l-6-6L7.41,8.59z"}/>
    </g>
</svg>);

const upArrow = (<svg
    className={"components-panel__arrow"} width="24px" height="24px" viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true" focusable="false">
    <g>
        <path fill={"none"} d={"M0,0h24v24H0V0z"}/>
    </g>
    <g>
        <path d={"M12,8l-6,6l1.41,1.41L12,10.83l4.59,4.58L18,14L12,8z"}/>
    </g>
</svg>);

class Notification extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <StatusMessage statusMessage={this.props.statusMessage} publishingError={this.props.publishingError}/>
                <ErrorMessage publishingError={this.props.publishingError}/>
                <DiscoursePermalink discoursePermalink={this.props.discoursePermalink}/>
            </div>
        );
    }
}

class StatusMessage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const statusMessage = this.props.statusMessage;

        if (statusMessage) {
            return (
                <div className={'wpdc-publishing-response success'}>{statusMessage}</div>
            );
        }
        return '';
    }
}

class ErrorMessage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const publishingError = this.props.publishingError;

        if (publishingError) {
            let message;
            switch (publishingError) {
                case 'deleted_topic':
                    message = __('Your post could not be published to Discourse. The associated Discourse topic may have been deleted. ' +
                        'Unlink the post so that it can be published again.', 'wp-discourse');
                    break;
                case 'Not Found':
                    message = __('Your post could not be updated on Discourse. The associated Discourse topic may have been deleted. ' +
                        'Unlink the post so that it can be published again.', 'wp-discourse');
                    break;
                case 'queued_topic':
                    message = __("Your post has been added to the Discourse approval queue. When it has been approved, you will need to link it to Discourse by" +
                        "selecting the 'Link to Existing Topic' option.", 'wp-discourse');
                    break;
                case 'Unprocessable Entity':
                    message = __('Your post could not be published to Discourse. There may be an existing Discourse topic that is using its permalink. Try linking the post with that topic.', 'wp-discourse');
                    break;
                default:
                    message = publishingError;
            }

            return <div className={'wpdc-publishing-response error'}>{message}</div>;
        }
        return '';
    }
}

class DiscoursePermalink extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.discoursePermalink) {
            const permalink = encodeURI(this.props.discoursePermalink);
            const link = <a href={permalink} className={'wpdc-permalink-link'} target={'_blank'}>{permalink}</a>;
            return <div className={'wpdc-permalink'}>{__('Your post is linked with', 'wp-discourse')} {link}</div>;
        }
        return '';
    }
}

class PublishingOptions extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.handlePublishMethodChange(e.target.value)
    }

    render() {
        if (!this.props.published) {
            return (
                <div className={'wpdc-publishing-options'}>
                    <h2 className={'wpdc-sidebar-title'}>{__('Publishing Options', 'wp-discourse')}</h2>
                    <label>
                        <input type="radio" name="wpdc_publish_options" value="publish_post"
                               checked={this.props.publishingMethod === 'publish_post'}
                               onChange={this.handleChange}/>
                        New Topic
                    </label>
                    <br/>
                    <label>
                        <input type="radio" name="wpdc_publish_options" value="link_post"
                               checked={this.props.publishingMethod === 'link_post'}
                               onChange={this.handleChange}/>
                        {__('Link to Existing Topic', 'wp-discourse')}
                    </label>
                    <hr/>
                </div>
            );
        } else {
            return '';
        }
    }
}

class PublishToDiscourse extends Component {
    constructor(props) {
        super(props);

        this.handleToBePublishedChange = this.handleToBePublishedChange.bind(this);
        this.handlePublishChange = this.handlePublishChange.bind(this);
    }

    handleToBePublishedChange(e) {
        this.props.handleToBePublishedChange(e.target.checked);
    }

    handlePublishChange(e) {
        this.props.handlePublishChange(e);
    }

    render() {
        const publishToDiscourse = this.props.publishToDiscourse;

        if ((!this.props.published) && this.props.publishingMethod === 'publish_post') {
            if (!('publish' === this.props.postStatus)) {
                return (
                    <div className={'wpdc-component-panel-body'}>
                        <h2 className={'wpdc-sidebar-title'}>{__('Publish to Discourse', 'wp-discourse')}</h2>
                        <div className={'wpdc-publish-topic'}>
                            <input type="checkBox" className={'wpdc-publish-topic-checkbox'}
                                   checked={publishToDiscourse} onChange={this.handleToBePublishedChange}/>
                            {__('Publish after save', 'wp-discourse')}
                            <span
                                className={'wpdc-info'}>{__('Automatically publish the post to Discourse when it is published on WordPress.', 'wp-discourse')}</span>
                        </div>
                    </div>
                );
            } else {
                return (
                    <div className={'wpdc-component-panel-body'}>
                        <h2 className={'wpdc-sidebar-title'}>{__('Publish to Discourse', 'wp-discourse')}</h2>
                        <button className={this.props.busy ? activeButtonClass : buttonClass}
                                onClick={this.handlePublishChange}>{__('Publish to Discourse', 'wp-discourse')}
                        </button>
                    </div>
                );
            }
        } else {
            return '';
        }
    }
}

class DiscourseCategorySelect extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.handleCategoryChange(e.target.value);
    }

    render() {
        if (!this.props.published && this.props.publishingMethod === 'publish_post' && this.props.discourseCategories) {
            const cats = Object.values(this.props.discourseCategories);
            const options = cats.map((cat) =>
                <option value={cat.id}
                        selected={parseInt(this.props.category_id, 10) === parseInt(cat.id, 10)}>{cat.name}</option>
            );
            return (
                <div className={'wpdc-category-select wpdc-component-panel-body'}>
                    <h2 className={'wpdc-sidebar-title'}>{__('Category', 'wp-discourse')}</h2>
                    <select onChange={this.handleChange} className={'widefat'}>
                        {options}
                    </select>
                    <hr/>
                </div>
            );
        } else {
            return '';
        }
    }
}

class LinkToDiscourseTopic extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isBusy: false,
            topicUrl: null,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(e) {
        this.setState({topicUrl: e.target.value})
    }

    handleClick(e) {
        this.props.handleLinkTopicClick(this.state.topicUrl);
    }

    render() {
        if (!this.props.published && this.props.publishingMethod === 'link_post') {
            return (
                <div className="wpdc-link-post wpdc-component-panel-body">
                    <h2 className={'wpdc-sidebar-title'}>{__('Topic URL', 'wp-discourse')}</h2>
                    <input
                        type="url"
                        className={'widefat wpdc-topic-url-input'}
                        onChange={this.handleChange}
                        value={this.state.topicUrl}
                    />

                    <button className={this.props.busy ? activeButtonClass : buttonClass}
                            onClick={this.handleClick}>
                        {__('Link With Discourse', 'wp-discourse')}
                    </button>
                </div>
            )
        } else {
            return '';
        }
    }
}

class UnlinkFromDiscourse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPanel: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.togglePanel = this.togglePanel.bind(this);
    }

    handleClick(e) {
        this.props.handleUnlinkFromDiscourseChange(e);
    }

    togglePanel() {
        this.setState({showPanel: !this.state.showPanel});
    }

    render() {
        if (this.props.published) {
            return (
                <div className={"wpdc-component-panel-body"}>
                    <h2 className={"wpdc-panel-section-title"}>
                        <button type="button" aria-expanded="false"
                                className={"components-button components-panel__body-toggle"}
                                onClick={this.togglePanel}>
                            <span aria-hidden="true">
                                {this.state.showPanel ? upArrow : downArrow}
                            </span>
                            {__('Unlink From Discourse', 'wp-discourse')}
                        </button>
                    </h2>
                    <div className={!this.state.showPanel ? 'hidden' : ''}>
                        <p className={'wpdc-info'}>
                            {__('Unlinking the post from Discourse will remove all Discourse metadata from the post.', 'wp-discourse')}
                        </p>
                        <button className={this.props.busy ? activeButtonClass : buttonClass}
                                onClick={this.handleClick}>{__('Unlink Post', 'wp-discourse')}
                        </button>
                    </div>
                </div>
            );
        } else {
            return '';
        }
    }
}

class UpdateDiscourseTopic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPanel: false,
        };
        this.handleClick = this.handleClick.bind(this);
        this.togglePanel = this.togglePanel.bind(this);
    }

    togglePanel() {
        this.setState({showPanel: !this.state.showPanel});
    }

    handleClick(e) {
        this.props.handleUpdateChange(e);
    }

    render() {
        if (this.props.published) {
            return (
                <div className={"wpdc-component-panel-body"}>
                    <h2 className={"wpdc-panel-section-title"}>
                        <button type="button" aria-expanded="false"
                                className={"components-button components-panel__body-toggle"}
                                onClick={this.togglePanel}>
                            <span aria-hidden="true">
                                {this.state.showPanel ? upArrow : downArrow}
                            </span>
                            {__('Update Discourse Topic', 'wp-discourse')}
                        </button>
                    </h2>
                    <div className={!this.state.showPanel ? 'hidden' : ''}>
                        <p className={'wpdc-info'}>
                            {__('Update the Discourse topic to the lastest saved version of the post.', 'wp-discourse')}
                        </p>
                        <button className={this.props.busy ? activeButtonClass : buttonClass}
                                onClick={this.handleClick}>
                            {__('Update Topic', 'wp-discourse')}
                        </button>
                    </div>
                </div>
            );
        } else {
            return '';
        }
    }
}

class TagTopic extends Component {
    constructor(props) {
        super(props);

        this.state = {
            chosenTags: [],
            inputContent: '',
            inputLength: 1,
        };

        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.focusInput = this.focusInput.bind(this);
    }

    focusInput(e) {
        this.tagInput.focus();
    }

    handleChange(e) {
        const val = e.target.value;
        this.setState({
            inputContent: ',' === val ? '' : val,
            inputLength: val.length === 0 ? 1 : val.length,
        });
    }

    handleKeyPress(e) {
        const keyVal = e.key;
        const val = e.target.value;

        if ('Enter' === keyVal || ',' === keyVal) {
            let currentChoices = this.state.chosenTags;
            currentChoices.push(val.trim().replace(/ /g, '-'));
            this.setState({
                chosenTags: currentChoices,
                inputContent: '',
            }, () => {
                this.props.handleTagChange(currentChoices);
            });
        }
    }

    handleClick(key) {
        let tags = this.state.chosenTags;
        let index = tags.indexOf(key);
        if (index > -1) {
            tags.splice(index, 1);
            this.setState({chosenTags: tags}, () => {
                this.props.handleTagChange(tags);
            });
        }
    }

    sanitizeArray(arr) {
        let tmp = arr.sort().reduce((accumulator, current) => {
            const length = accumulator.length;
            if ((length === 0 || accumulator[length - 1] !== current) && current.trim() !== '') {
                accumulator.push(current);
            }
            return accumulator;
        }, []);

        return tmp;
    }

    render() {
        if ('publish_post' === this.props.publishingMethod && !this.props.published) {
            let tagDisplay = this.sanitizeArray(this.props.tags);
            tagDisplay = tagDisplay.map((tag, index) =>
                <span className={'components-form-token-field__token'} key={tag}>
                    <span className={'components-form-token-field__token-text'}>
                        <span className="screen-reader-text">{tag}</span>
                        <span aria-hidden="true">{tag}</span>
                    </span>
                    <button type="button"
                            aria-label="Remove Tag"
                            className={'components-button components-icon-button components-form-token-field__remove-token'}
                            onClick={this.handleClick.bind(this, tag)}
                            key={tag}
                    >
                        <svg aria-hidden="true"
                             role="img"
                             focusable="false"
                             className={'dashicon dashicons-dismiss'}
                             xmlns="http://www.w3.org/2000/svg"
                             width="20" height="20" viewBox="0 0 20 20">
                            <path
                                d={'M10 2c4.42 0 8 3.58 8 8s-3.58 8-8 8-8-3.58-8-8 3.58-8 8-8zm5 11l-3-3 3-3-2-2-3 3-3-3-2 2 3 3-3 3 2 2 3-3 3 3z'}/>
                        </svg>
                    </button>
                </span>
            );
            return (
                <div className={'wpdc-component-panel-body'}>
                    <h2 className={'wpdc-sidebar-title'}>{__('Tags', 'wp-discourse')}</h2>
                    <div className={'components-form-token-field__input-container'} onClick={this.focusInput}>

                        {tagDisplay}
                        <input type={'text'}
                               size={this.state.inputLength}
                               className={'components-form-token-field__input'}
                               onChange={this.handleChange}
                               onKeyPress={this.handleKeyPress}
                               value={this.state.inputContent}
                               ref={input => {
                                   this.tagInput = input;
                               }}
                        />
                    </div>
                    <hr/>
                </div>
            );
        } else {
            return '';
        }
    }
}

class DiscourseSidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            published: false,
            postStatus: '',
            publishingMethod: 'publish_post',
            publishToDiscourse: 0,
            publishPostCategory: pluginOptions.defaultCategory,
            topicTags: [],
            discoursePostId: null,
            discoursePermalink: null,
            publishingError: null,
            busyUnlinking: false,
            busyUpdating: false,
            busyLinking: false,
            busyPublishing: false,
            statusMessage: null,
            discourseCategories: null,
        };

        this.updateStateFromDatabase(this.props.postId);
        this.getDiscourseCategories();

        this.handleToBePublishedChange = this.handleToBePublishedChange.bind(this);
        this.handlePublishChange = this.handlePublishChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleTagChange = this.handleTagChange.bind(this);
        this.handleUnlinkFromDiscourseChange = this.handleUnlinkFromDiscourseChange.bind(this);
        this.handlePublishMethodChange = this.handlePublishMethodChange.bind(this);
        this.handleUpdateChange = this.handleUpdateChange.bind(this);
        this.handleLinkTopicClick = this.handleLinkTopicClick.bind(this);
    }

    getDiscourseCategories() {
        wp.apiFetch({path: 'wp-discourse/v1/get-discourse-categories', method: 'GET'}).then(
            (data) => {
                this.setState({
                    discourseCategories: data,
                });
            },
            (err) => {
                // Todo: this should be handled. Categories won't be available until the plugin is configured.
                return null;
            }
        );
    }

    updateStateFromDatabase(postId) {
        if (this.isAllowedPostType()) {
            wp.apiFetch({path: `/wp/v2/posts/${postId}`, method: 'GET'}).then(
                (data) => {
                    const meta = data.meta;
                    let publishToDiscourse = parseInt(meta.publish_to_discourse, 10) === 0 ? 0 : 1;
                    if( 'deleted_topic' === meta.wpdc_publishing_error || 'queued_topic' === meta.wpdc_publishing_error ) {
                        publishToDiscourse = 0;
                    }
                    this.setState({
                        published: meta.discourse_post_id > 0,
                        postStatus: data.status,
                        publishToDiscourse: publishToDiscourse,
                        publishPostCategory: meta.publish_post_category > 0 ? meta.publish_post_category : pluginOptions.defaultCategory,
                        topicTags: meta.wpdc_topic_tags.split(','),
                        discoursePostId: meta.discourse_post_id,
                        discoursePermalink: meta.discourse_permalink,
                        publishingError: meta.wpdc_publishing_error,
                    });
                    return null;
                },
                (err) => {
                    return null;
                }
            );
        }
    }

    isAllowedPostType() {
        return pluginOptions.allowedPostTypes.indexOf(this.props.post.type) >= 0;
    }

    handlePublishMethodChange(publishingMethod) {
        this.setState({publishingMethod: publishingMethod});
    }

    // Todo: this isn't quite right, maybe category and tag changes should be handled separately?
    handleToBePublishedChange(publishToDiscourse) {
        this.setState({
            publishToDiscourse: publishToDiscourse ? 1 : 0,
            statusMessage: '',
        }, () => {
            wp.apiRequest({
                path: '/wp-discourse/v1/set-publishing-options',
                method: 'POST',
                data: {
                    id: this.props.postId,
                    publish_to_discourse: this.state.publishToDiscourse,
                    publish_post_category: this.state.publishPostCategory,
                    wpdc_topic_tags: this.state.topicTags,
                }
            }).then(
                (data) => {
                    return null;
                },
                (err) => {
                    return null;
                }
            );
        });
    }

    handleCategoryChange(category_id) {
        this.setState({publishPostCategory: category_id}, () => {
            this.handleToBePublishedChange(this.state.publishToDiscourse);
        });
    }

    handleTagChange(tags) {
        this.setState({topicTags: tags}, () => {
            this.handleToBePublishedChange(this.state.publishToDiscourse);
        })
    }

    handleLinkTopicClick(topicUrl) {
        this.setState({
            busyLinking: true,
            statusMessage: '',
        });
        wp.apiRequest({
            path: '/wp-discourse/v1/link-topic',
            method: 'POST',
            data: {id: this.props.postId, topic_url: topicUrl}
        }).then(
            (data) => {
                this.setState({
                    busyLinking: false,
                });

                if (data.discourse_permalink) {
                    this.setState({
                        published: true,
                        discoursePermalink: data.discourse_permalink,
                        publishingError: null,
                    });
                } else {
                    this.setState({
                        publishingError: __('There has been an error linking your post with Discourse.', 'wp-discourse')
                    });
                }

                return null;
            },
            (err) => {
                const message = err.responseJSON && err.responseJSON.message ? err.responseJSON.message : __('There has been an error linking your post with Discourse.', 'wp-discourse');
                this.setState({
                    busyLinking: false,
                    published: false,
                    publishingError: message,
                });

                return null;
            }
        );
    }

    handleUnlinkFromDiscourseChange(unlink_state) {
        this.setState({
            busyUnlinking: true,
            statusMessage: '',
        });
        wp.apiRequest({
            path: '/wp-discourse/v1/unlink-post',
            method: 'POST',
            data: {id: this.props.postId}
        }).then(
            (data) => {
                this.setState({
                    busyUnlinking: false,
                    published: false,
                    publishingMethod: 'link_post',
                    discoursePermalink: null,
                    statusMessage: __('Your post has been unlinked from Discourse.', 'wp-discourse')
                });
                return null;
            },
            (err) => {
                return null;
            }
        );
    }

    handlePublishChange(e) {
        this.setState({
            busyPublishing: true,
            statusMessage: '',
        });
        // Todo: is the category being set here? I think so, (from handleCategoryChange) but check this!
        wp.apiRequest({
            path: '/wp-discourse/v1/publish-topic',
            method: 'POST',
            data: {id: this.props.postId}
        }).then(
            (data) => {
                const success = 'success' === data.publish_response;
                this.setState({
                    busyPublishing: false,
                    published: success,
                    publishingError: success ? null : data.publish_response,
                    publishingMethod: data.publish_response = 'Unprocessable Entity' ? 'link_post' : 'publish_post',
                    discoursePermalink: data.discourse_permalink,
                });
                return null;
            },
            (err) => {
                const message = err.responseJSON && err.responseJSON.message ? err.responseJSON.message : __('There has been an error linking your post with Discourse.', 'wp-discourse');
                this.setState({
                    busyPublishing: false,
                    published: false,
                    publishingError: message,
                });
                return null;
            }
        );
    }

    handleUpdateChange(e) {
        this.setState({
            busyUpdating: true,
            statusMessage: '',
        });
        wp.apiRequest({
            path: '/wp-discourse/v1/update-topic',
            method: 'POST',
            data: {id: this.props.postId}
        }).then(
            (data) => {
                const response = data.update_response,
                    success = 'success' === response;
                let message;
                if (success) {
                    message = __('The Discourse topic has been updated!', 'wp-discourse');
                }
                this.setState({
                    busyUpdating: false,
                    statusMessage: message,
                    publishingError: success ? null : data.update_response,
                });
                return null;
            },
            (err) => {
                const message = __('There was an error updating the Discourse topic.', 'wp-discourse');
                this.setState({
                    busyUpdating: false,
                    statusMessage: message,
                });
                return null;
            }
        );
    }

    componentDidUpdate(prevProps) {
        if (this.isAllowedPostType()) {
            const post = this.props.post,
                prevPost = prevProps.post,
                meta = this.props.post.meta,
                prevMeta = prevProps.post.meta;
            if (post.status !== prevPost.status ||
                meta.discourse_post_id !== prevMeta.discourse_post_id ||
                meta.wpdc_publishing_response !== prevMeta.wpdc_publishing_response ||
                meta.wpdc_publishing_error !== prevMeta.wpdc_publishing_error) {
                // Todo: this is weird.
                let publishToDiscourse = parseInt(meta.publish_to_discourse, 10) === 0 ? 0 : 1;
                if( 'deleted_topic' === meta.wpdc_publishing_error || 'queued_topic' === meta.wpdc_publishing_error ) {
                    publishToDiscourse = 0;
                }
                this.setState({
                    published: meta.discourse_post_id > 0,
                    postStatus: post.status,
                    publishToDiscourse: publishToDiscourse,
                    discoursePostId: meta.discourse_post_id,
                    discoursePermalink: meta.discourse_permalink,
                    publishingError: meta.wpdc_publishing_error,
                });
            }
        }
    }

    render() {
        if (this.isAllowedPostType()) {
            return (
                <Fragment>
                    <PluginSidebarMoreMenuItem
                        target="discourse-sidebar"
                    >
                        {__('Discourse', 'wp-discourse')}
                    </PluginSidebarMoreMenuItem>
                    <PluginSidebar
                        name="discourse-sidebar"
                        title={__('Discourse', 'wp-discourse')}
                    >
                        <PanelBody>
                            <div className={'wpdc-sidebar'}>
                                <Notification
                                    published={this.state.published}
                                    discoursePostId={this.state.discoursePostId}
                                    publishingError={this.state.publishingError}
                                    discoursePermalink={this.state.discoursePermalink}
                                    statusMessage={this.state.statusMessage}
                                />
                                <PublishingOptions published={this.state.published}
                                                   handlePublishMethodChange={this.handlePublishMethodChange}
                                                   publishingMethod={this.state.publishingMethod}
                                />
                                <DiscourseCategorySelect
                                    publishingMethod={this.state.publishingMethod}
                                    published={this.state.published}
                                    category_id={this.state.publishPostCategory}
                                    handleCategoryChange={this.handleCategoryChange}
                                    discourseCategories={this.state.discourseCategories}
                                />
                                <TagTopic
                                    publishingMethod={this.state.publishingMethod}
                                    published={this.state.published}
                                    handleTagChange={this.handleTagChange}
                                    tags={this.state.topicTags}
                                />
                                <PublishToDiscourse publishingMethod={this.state.publishingMethod}
                                                    published={this.state.published}
                                                    postStatus={this.state.postStatus}
                                                    publishToDiscourse={this.state.publishToDiscourse}
                                                    handleToBePublishedChange={this.handleToBePublishedChange}
                                                    handlePublishChange={this.handlePublishChange}
                                                    busy={this.state.busyPublishing}
                                />
                                <LinkToDiscourseTopic publishingMethod={this.state.publishingMethod}
                                                      published={this.state.published}
                                                      postId={this.props.postId}
                                                      busy={this.state.busyLinking}
                                                      handleLinkTopicClick={this.handleLinkTopicClick}
                                />
                                <div className={'wpdc-published-post'}>
                                    <UpdateDiscourseTopic
                                        published={this.state.published}
                                        busy={this.state.busyUpdating}
                                        handleUpdateChange={this.handleUpdateChange}
                                    />
                                    <UnlinkFromDiscourse
                                        published={this.state.published}
                                        handleUnlinkFromDiscourseChange={this.handleUnlinkFromDiscourseChange}
                                        busy={this.state.busyUnlinking}
                                    />
                                </div>
                            </div>
                        </PanelBody>
                    </PluginSidebar>
                </Fragment>
            );
        } else {
            return '';
        }
    }
}

const HOC = withSelect((select, {forceIsSaving}) => {
    const {
        getCurrentPostId,
        getCurrentPost,
    } = select('core/editor');
    return {
        postId: getCurrentPostId(),
        post: getCurrentPost(),
    };
})(DiscourseSidebar);

registerPlugin('discourse-sidebar', {
    icon: iconEl,
    render: HOC,
});