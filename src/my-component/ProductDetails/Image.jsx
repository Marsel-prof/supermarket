import React, {useState} from 'react';

function Image({data}) {
    const [image]=useState(data)

    return (
        <>
            {image.map((item)=>{
                return <div className={`card-img text-center`} key={item.id}>
                    <img className={`mt-2`} width={120} height={100} src={`http://localhost:1337${item.attributes.url}`}/>
                </div>
            })}
        </>
    );
}

export default Image;
