
export default function CustomImage({src, pt}, ...props) {
    return(
        <div className="custom-image" style={{paddingTop: pt}}>
            <img src={src} alt=""/>
        </div>
    )
}