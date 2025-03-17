import { SVGAttributes } from 'react';

export default function AppLogoIcon(props: React.ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img
            {...props}
            src="./images/administracionlogo.jpg"
            alt="App Logo"
            className="w-10 h-10"
        />
    );
}

