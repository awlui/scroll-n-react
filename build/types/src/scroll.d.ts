/// <reference types="react" />
import * as React from 'react';
import { IScrollProps, IState } from './interfaces/scroll.interface';
/**
Notes
scrollHeight: length of entire scrollable area;
scrollTop: length of top of scroll window to top of scrollable area;
*/
/**
  ScrollRx React Component
*/
export declare class ScrollRx extends React.Component<IScrollProps, IState> {
    /**
    * Holds the underlying div DOM Element
    */
    private main;
    /**
    * Part of the anchorBottom strategy ofkeeping the scrollbar in placeholder
    * on a getMore call. This holds the ref of the top element from the last set of data.
    */
    private placeholder;
    /**
    * Holds the id of the placeholder.
    */
    private placeholderID;
    constructor(props: IScrollProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    reset(): void;
    shouldComponentUpdate(nextProps: any, nextState: any): boolean;
    componentDidUpdate(): void;
    componentWillUpdate(): void;
    render(): JSX.Element;
    _onScroll: (cb: Function) => void;
    /**
    * @returns This is the default function for the getMore Prop.
    */
    _defaultGetMore: () => void;
}
