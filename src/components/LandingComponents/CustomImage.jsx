
export default function CustomImage({src, pt}, ...props) {
    return(
        <div className="custom-image" style={{paddingTop: pt}}>
            <img src={import.meta.env.BASE_URL+src} alt=""/>
        </div>
    )
}