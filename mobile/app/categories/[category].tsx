import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useLocalSearchParams, useNavigation } from 'expo-router';


type Props = {}

const ProductListByCategory = ({}: Props) => {
  const { category } = useLocalSearchParams();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: category });
  }, [navigation]);
  return (
    <View>
      <Text>{category}</Text>
    </View>
  )
}

export default ProductListByCategory

const styles = StyleSheet.create({})