import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './index.less';

export default class Image extends React.PureComponent {

    static propTypes = {
        className: PropTypes.string,
        prefixCls: PropTypes.string,
        id: PropTypes.string,
        source: PropTypes.any,
        alternative: PropTypes.any,
        style: PropTypes.object,
        portrait: PropTypes.bool,
        color: PropTypes.string,
        size: PropTypes.oneOf(['xxs', 'xs', 'sm', 'md', 'lg']),
        draggable: PropTypes.bool,
        onClick: PropTypes.func,
        opacity: PropTypes.number,
        preview: PropTypes.oneOfType([PropTypes.oneOf(['true', 'false', 'preview']), PropTypes.func]),
    };

    static defaultProps = {
        portrait: false,
        prefixCls: 'tm-image',
        draggable: false,
        opacity: 1,
    };

    static orientation = (file, callback) => {};

    constructor(props) {
        super(props);
        this.state = {
            source: props.source,
            opacity: props.opacity,
            scale: [1, 1],
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.source !== nextProps.source || this.opacity) {
            this.source = nextProps.source;
        }
    }

    set source(source) {
        if (this.state.source === source) {
            return;
        }

        this.setState({
            source: source,
        });
    }
    get source() {
        return this.state.source;
    }

    set opacity(opacity) {
        if (this.state.opacity === opacity) {
            return;
        }

        this.setState({opacity});
    }
    get opacity() {
        return this.state.opacity;
    }

    set preview(preview) {
        this.gallery = preview;
    }
    get preview() {
        return this.gallery;
    }

    fadein = duration => {
        if (!this.image || this.image.style.opacity === 1) {
            return;
        }

        const image = this.image;

        if (!duration || duration <= 0) duration = 500;

        this.timestamp = 0;
        const opacity = this.image.style.opacity;
        const delta = 1 - opacity;
        if (delta <= 0) {
            return;
        }

        const doFadein = timestamp => {
            if (this.timestamp === 0) {
                this.timestamp = timestamp;
            } else {
                image.style.opacity = opacity + delta * (timestamp - this.timestamp) / duration;
            }
            if (image.style.opacity < 1) {
                requestAnimationFrame(doFadein);
            }
        }
        requestAnimationFrame(doFadein);
    }

    render() {
        const {
            className,
            prefixCls,
            portrait,
            alternative,
            color,
            style = {},
            size,
            source,
            onReady,
            ...restProps
        } = this.props;

        let imgSrc = alternative;
        if (!!this.state.source) {
            imgSrc = this.state.source;
        }

        const wrapCls = classnames({
            [`${prefixCls}`]: true,
            [`${prefixCls}-portrait`]: portrait,
        }, className);

        const wrapStyle = {
            ...style,
            opacity: this.state.opacity
        };

        if (Object.prototype.toString.call(imgSrc) === '[object Object]') {
            let svgStyle = {...style};
            if (!!color) {
                svgStyle = {
                    ...wrapStyle,
                    fill: color,
                };
            }

            const sizeClass = size ? `${prefixCls}-${size}` : '';
            let viewBox = undefined;
            const metrics = imgSrc.default.viewBox.split(' ');
            if (Object.prototype.toString.call(metrics) === '[object Array]' && metrics.length === 4) {
                viewBox = '0 0 ' + metrics[2] + ' ' + metrics[3];
            }

            return (
                <div
                    ref={el => this.image = ReactDOM.findDOMNode(el)}
                    Element={'svg'}
                    className={`${prefixCls}-svg ${wrapCls} ${sizeClass}`}
                    viewBox={viewBox}
                    style={svgStyle}
                    onClick={this.onPreview}
                    {...restProps}
                >
                    <use xlinkHref={`#${imgSrc.default.id}`} />
                </div>
            );
        }

        return (
            <div
                ref={el => this.image = ReactDOM.findDOMNode(el)}
                Element={'img'}
                className={wrapCls}
                src={this.state.source}
                alt=''
                style={wrapStyle}
                {...restProps}
            />
        );
    }
}