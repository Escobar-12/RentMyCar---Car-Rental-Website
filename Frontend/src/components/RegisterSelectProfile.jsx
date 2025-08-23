import React from 'react'
import { IKContext, IKUpload } from 'imagekitio-react';
import { useEffect, useState } from "react";
import useApplication from '../hooks/applicationHook';

const RegisterSelectProfile = ({setImg}) => {
    const [loading, setLoading] = useState();
    const [showImage, setShowImage] = useState();
    const { imageKitConfig, authenticator } = useApplication();


    useEffect(() => {
        return () => {
            if (showImage && showImage.startsWith("blob:")) {
                URL.revokeObjectURL(showImage);
            }
        };
    }, [showImage]);

  return (
    <div>
        <div className={`relative border ${loading ? "isLoading" : ""} w-24 h-24 rounded-full object-cover overflow-hidden border-2 border-gray-400 border-dashed cursor-pointer`}>
            <img
                className={`w-full h-full object-cover ${loading ? "isLoading" : ""}`}
                src={showImage|| "/src/assets/default-user.jpg"}
                alt="upload area"
            />
            
            <div className="absolute inset-0 flex justify-center items-center opacity-0 cursor-pointer">
                <IKContext
                    urlEndpoint={imageKitConfig.urlEndpoint}
                    publicKey={imageKitConfig.publicKey}
                    authenticator={authenticator}
                >
                    <IKUpload
                        useUniqueFileName={true}
                        onUploadStart={() => {
                            setLoading(true);
                        }}
                        onSuccess={(res) => {
                            if (!res?.url) return;
                            setImg(res.name);
                            setShowImage(res.url);
                            setLoading(false);
                        }}
                        className="w-full h-full cursor-pointer"
                        onError={(err) => console.error("Upload error:", err)}
                    />
                </IKContext>
            </div>
        </div>
    </div>
  )
}

export default RegisterSelectProfile