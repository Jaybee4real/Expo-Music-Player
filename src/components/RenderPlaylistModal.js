import React from 'react'
import { View, Text } from 'react-native'
import { Modalize } from "react-native-modalize"

export default function RenderPlaylistModal({ refProp, activeItem, ...props }) {
    return (
        <Modalize ref={refProp}>
            
        </Modalize>
    )
}
