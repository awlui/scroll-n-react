# Scroll-n-react
> A react component library...
## Description

### Primary Objective
> Scroll-n-react is a React Component Library for creating components that trigger functions at a certain scroll length. This is to create potentially infinite scrollers. There are other infinite scroller component libraries out ther but none that I have seen easily replicate features like the facebook messenger load more messages feature.

[Demo](https://www.awlui.github.io/scroll-n-react)
[TypeDocs](https://www.awlui.github.io/scroll-n-react/docs/index.html)
```

//Example you can check out in the example.tsx file. Just a real rough sketch of what using the component is like.
<ScrollRx onRef={ref => {this.child = ref}} height={300} loader={Wave2} threshold={0} width={250} getMore={this.Foo} anchorBottom component={K} fetching={this.state.fetching} dataArray={this.state.dataArray}/>

```

| Props        | Purpose                 | type  |
| ------------- |:------------------:| -----:|
| onRef     | used to get a hold of the scroll instance to call its reset method      | Function |
| height      | Required prop that sets the height of the scroller         |   Number |
| width | Required prop that sets the width of the scroller          |    Number |
|threshold |  Determines how far from the top or bottom that the scroller triggers its getMore callback | Number
|getMore | The callback that should fetch more data via ajax or any other method, it should provide new props to the dataArray prop | Function
|anchorBottom/anchorTop | Determines the orientation of the scroller. Anchorbottom makes it act a lot like facebook messenger's chat scrollers | boolean
|dataArray | Array of objects.Each object MUST HAVE AN id property. This is used to coordinate the key feature and main motivation for this project. The id is used to hold a placeholder to the last top element after more data comes in instead of pulling your view up along with the new data. | {id: any}Array
|component | Stateless component which will be filled with the data from dataArray | Function
|fetching | prop you pass in that will display or hide the loader component. Use in tandem with getMore | Boolean
|loader | A loader component that will show up when fetching is set to true. I provide a default <div>Loader</div>, but you can use something like react-better-spintkit to provide a better loader. | Function

