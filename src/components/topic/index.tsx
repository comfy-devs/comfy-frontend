/* Base */
import { h, FunctionalComponent, createRef } from "preact";
import { topicExtraToDisplayName } from "../../scripts/comfy/topic";
/* Styles */
import style from "./style.scss";
/* Components */
import Slider from "react-slick";
import ShowCard from "../show-card";

const Topic: FunctionalComponent<TopicConnectedProps> = (props: TopicConnectedProps) => {
    const sliderRef = createRef();
    const wantedItems = props.small ? 5 : 10;
    const sliderSettings = {
        infinite: false,
        swipeToSlide: true,
        speed: 300,
        slidesToShow: Math.min(props.small ? (props.dimensions.w > 1500 ? (props.dimensions.w - 80) / 2 / 220 : (props.dimensions.w - 40) / 220) : (props.dimensions.w - 40) / 220, wantedItems),
        slidesToScroll: 2,
    };

    return (
        <div className={style.topic} data={props.small === true ? "small" : undefined}>
            <div className={style["topic-title-wrapper"]}>
                {props.icon === undefined ? null : <div className={style[`icon-${props.icon}`]} />}
                <div className={style["topic-title"]}>{props.title}</div>
                {props.items.length < 2 ? null : (
                    <div
                        className={style["topic-nav-button"]}
                        onClick={() => {
                            sliderRef.current?.slickPrev();
                        }}>
                        <div className={style["icon-previous"]} />
                    </div>
                )}
                {props.items.length < 2 ? null : (
                    <div
                        className={style["topic-nav-button"]}
                        onClick={() => {
                            sliderRef.current?.slickNext();
                        }}>
                        <div className={style["icon-next"]} />
                    </div>
                )}
            </div>
            <Slider {...sliderSettings} className={style["topic-previews"]} ref={sliderRef}>
                {props.items.map((e, i) => {
                    return <ShowCard alt key={i} item={e} extra={topicExtraToDisplayName(e, props.extra)} preferences={props.preferences} />;
                })}
                {props.items.length < wantedItems ? new Array(wantedItems - props.items.length).fill(null).map((e, i) => <ShowCard alt key={i} preferences={props.preferences} />) : null}
            </Slider>
        </div>
    );
};

export default Topic;
