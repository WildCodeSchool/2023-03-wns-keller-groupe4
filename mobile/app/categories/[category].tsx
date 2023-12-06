import { StyleSheet, Text, View } from 'react-native'
import { useLocalSearchParams } from 'expo-router';

import React from 'react'

type Props = {}

const ProductListByCategory = ({}: Props) => {
  const { category } = useLocalSearchParams();
  return (
    <View>
      <Text>{category}</Text>
    </View>
  )
}

export default ProductListByCategory

const styles = StyleSheet.create({})