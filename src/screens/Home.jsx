import React, { useState } from 'react'
import { Text, StyleSheet, SafeAreaView, Image, View } from 'react-native'
import { container } from '../shared/Styles'
import {BasicTextInput} from '../shared/Inputs'
import { Icon } from 'react-native-elements'
import {defText} from '../shared/Styles'

const Home = () => {
  const [whatsNew, setWhatsNew] = useState('');

  return (
    <SafeAreaView style={container}>
      <View>
        <View style={styles.logoWrapper}>
          <Image source={require('../assets/ChillOut_Logo.png')} style={styles.logo}/>
        </View>
        <View style={styles.whatsNewWrapper}>
          <BasicTextInput styles={styles.whatsNew} plHolder="What's new?" setState={setWhatsNew} valueState={whatsNew} />
        </View>
        <View style={styles.photoVideoAttachmentWrapper}>
          <Icon style={styles.photoIcon} name="camera-alt"/><Text style={[styles.photoVideoText, defText]}>Photo/Video</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  logo: {
     width: '60%',
     height: 100,
     alignSelf: 'center'
  },
  logoWrapper: {
  },
  whatsNewWrapper:{
    marginVertical: 10,
    alignSelf: 'center'
  },
  whatsNew:{
    width: '100%'
  },
  photoIcon: {
    position: 'absolute',
  },
  photoVideoAttachmentWrapper:{
    alignSelf:'center',
    width: '60%'
  },
  photoVideoText:{
    textAlign: 'left',
    color: '#000000'
  }
});
export default Home