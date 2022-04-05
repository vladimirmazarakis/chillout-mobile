import React from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'

export const Loading = ({ activityIndicatorSize }) => {

  return (
    <View style={styles.loadingWrapper}>
        <ActivityIndicator size={activityIndicatorSize} color="#F580F8" style={styles.loading}/>
    </View>
  )
}

Loading.defaultProps = {
    activityIndicatorSize: 60
};

const styles = StyleSheet.create({
    loadingWrapper:{
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    loading: {
        alignSelf: 'center'
    }
});
