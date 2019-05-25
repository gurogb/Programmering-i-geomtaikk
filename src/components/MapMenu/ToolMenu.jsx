import React from 'react'
import './menu.css'

function ToolMenu(props){

    return(
      <div>
        <BufferTool bufferToolSumbit={props.bufferToolSumbit} layers={props.layers}/>
        <UnionTool handleSubmit={props.handleSubmit}  unionTool={props.unionTool} layers={props.layers}/>
        <IntersectionTool handleSubmit={props.handleSubmit} intersectionTool={props.intersectionTool} layers={props.layers}/>
        <DifferenceTool handleSubmit={props.handleSubmit} differenceTool={props.differenceTool} layers={props.layers}/>
      </div>
    )
}

function BufferTool(props){

    return(
        <div className="tool">
            Buffer
            <form
                onSubmit={props.bufferToolSumbit}
                >
                <select className="bufferSelect">
                    {props.layers.map(layer => <option key={layer.id} > {layer.id}</option>)}
                </select>
                <input type="number" className="bufferDist"/>
                <input type="submit" value="GO"/>
            </form>
        </div>
    )
}

function UnionTool(props){

    return(
        <div className="tool">
            Union
            <form
                onSubmit ={props.handleSubmit}
                className="union-form"
                >
                <select className="select-one">
                    {props.layers.filter(layer => layer.source.data.geometry.type === "Polygon" || layer.source.data.geometry.type === "MultiPolygon" ).map(layer => <option key={layer.id} > {layer.id}</option>)}
                </select>
                <select className="select-two">
                    {props.layers.filter(layer => layer.source.data.geometry.type === "Polygon"|| layer.source.data.geometry.type === "MultiPolygon").map(layer => <option key={layer.id} > {layer.id}</option>)}
                </select>
                <input type="submit" value="GO"/>
            </form>
        </div>
    )
}

function IntersectionTool(props){

    return(
        <div className="tool">
            Intersection
            <form
                onSubmit ={props.handleSubmit}
                className="intersection-form"
                >
                <select className="select-one">
                    {props.layers.filter(layer => layer.source.data.geometry.type === "Polygon" || layer.source.data.geometry.type === "MultiPolygon").map(layer => <option key={layer.id} > {layer.id}</option>)}
                </select>
                <select className="select-two">
                    {props.layers.filter(layer => layer.source.data.geometry.type === "Polygon" || layer.source.data.geometry.type === "MultiPolygon").map(layer => <option key={layer.id} > {layer.id}</option>)}
                </select>
                <input type="submit" value="GO"/>
            </form>
        </div>
    )
}

function DifferenceTool(props){

    return(
        <div className="tool">
            Difference
            <form
                onSubmit ={props.handleSubmit}
                className="difference-form"
                >
                <select className="select-one">
                    {props.layers.filter(layer => layer.source.data.geometry.type === "Polygon" || layer.source.data.geometry.type === "MultiPolygon").map(layer => <option key={layer.id} > {layer.id}</option>)}
                </select>
                <select className="select-two">
                    {props.layers.filter(layer => layer.source.data.geometry.type === "Polygon" || layer.source.data.geometry.type === "MultiPolygon").map(layer => <option key={layer.id} > {layer.id}</option>)}
                </select>
                <input type="submit" value="GO"/>
            </form>
        </div>
    )
}

export default ToolMenu
