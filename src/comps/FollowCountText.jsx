import React from 'react'
import useNumbers from '../helpers/Numbers'
import {Text} from 'react-native'

const FollowCountText = ({ count, ...rest }) => {
    const { abbreviateNumber } = useNumbers();
    const newCount = abbreviateNumber(count);
    return (
        <Text {...rest}>{newCount}</Text>
    )
}

export default FollowCountText