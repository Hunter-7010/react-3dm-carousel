[![Actively Maintained](https://img.shields.io/badge/Maintenance%20Level-Actively%20Maintained-green.svg)](https://gist.github.com/cheerfulstoic/d107229326a01ff0f333a1d3476e068d)


# react-3dm-carousel

A true 3D Carousel component for images and slide show.

![Carousel Example](https://ucarecdn.com/3a5c0e50-634b-464d-b583-e9b7a29a1e9c/ScreenShot20230706at111426PM.png)


## Example

[![Edit react-3dm-carousel-basic-example](https://raw.githubusercontent.com/abumalick/powered-by-vercel/master/powered-by-vercel.svg)](https://react-3dm-carousel.vercel.app)

## Installation and usage

Install it via npm:

```
npm i react-3dm-carousel
```

or yarn:

```
yarn add react-3dm-carousel
```

Then import the Carousel component like so :

```
import { Carousel } from 'react-3dm-carousel';
```

The only thing this component needs to run is an array of slides, which are objects with a unique key property and a content property containing an image instance :

```
import { Carousel } from "react-3dm-carousel";
const App = () => {
 return (
    <div className="">
      <Carousel />
    </div>
  );
}

```

Carousel with all the props

```
import { Carousel } from "react-3dm-carousel";
const App = () => {
 return (
    <div className="">
      <Carousel
        cardsData={data}
        setSelectedCardIdx={setSelectedCardIdx}
        rotation={true}
        rotationDuration={60}
        tilt={true}
        freeRoam={true}
        freeRoamLowerBounds={-180}
        freeRoamUpperBounds={0}
      />
    </div>
  );
}

```

And you're all set. You can also use props for better control of how the carousel looks and behaves:

## Props

| Name            | Default value                    | Description                                                                                                                                                                                                                                                                                          |
| --------------- | -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| cardsData          | dummy data                              | An array containing elements of the form `[{ id: string; title: string; description: string; image: string; }]` where key holds any unique value, title and description for the title and description and image url for the background image of the card. |
| rotation       | `true`                           | `Optional` Enable or disable rotation of the carousel. Defaults to `true` (rotation is enabled).                                                                                            |
| rotationDuration  | `60`                            | `Optional` time in `seconds` it takes to complete a full rotation. Only applicable when `rotation` is enabled. defaults to `60` seconds.              |
| tilt    | `true`                              | `Optional` Cool tilt effect on `Carousel` relative to mouse position. defaults to `true`.                                                                           |
| setSelectedCardIdx | `undefined` | `Optional` `React state setter` to pass your setState to Carousel. defaults to `undefined`.                                                                                                     |
| freeRoam    | `false`                              | `Optional` Enables the user to freely rotate and move around the carousel canvas. defaults to `false` enabling this feature will cause the tilt to `disable`. |
| freeRoamUpperBounds    | `false`                              | `Optional` define the upper bounds of the free roam. make upper bounds to `360` and lower bounds to `-360` to move in all directions. |
| freeRoamLowerBounds    | `false`                              | `Optional` define the upper bounds of the free roam. make upper bounds to `360` and lower bounds to `-360` to move in all directions. |