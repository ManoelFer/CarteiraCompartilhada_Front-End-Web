import ReactLottie from 'react-lottie';

interface IPropsLottie {
    animationData: {};
    [x: string]: any;
}

export const Lottie = ({ animationData, ...rest }: IPropsLottie) => {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };


    return (
        <ReactLottie options={defaultOptions}
            width={500 || rest.height}
            height={400 || rest.height}
            isStopped={false}
            isPaused={false} {...rest} />
    )
}