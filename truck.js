import React, { useState, useEffect }from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Modal, 
          TouchableWithoutFeedback, Keyboard, 
          Button, ScrollView, Image  } from 'react-native';
import { AntDesign, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Truck({}) {

  // truck weights
const [curbWeight, setCurbWeight] = useState('0');
const [grossWeight, setGrossWeight] = useState('0');
const [payloadWeight, setPayloadWeight] = useState('0');
const [passengerWeight, setPassengerWeight] = useState('0');
const [petWeight, setPetWeight] = useState('0');
const [cargoWeight, setCargoWeight] = useState('0');

  // trailer weights
const [hitchWeight, setHitchWeight] = useState('0');
const [trailerGrossWeight, setTrailerGrossWeight] = useState('0');
const [trailerDryWeight, setTrailerDryWeight] = useState('0');
const [trailerCargoWeight, setTrailerCargoWeight] = useState('0');
const [trailerWaterWeight, setTrailerWaterWeight] = useState('0');
const [trailerPropaneWeight, setTrailerPropaneWeight] = useState('0');
const [trailerAvailableWeight, setTrailerAvailableWight] = useState('0')

const [trailerType, setTrailerType] = useState('Travel Trailer')
const [availableWeight, setAvailableWeight] = useState('0')

  // modals for information
const [truckGrossWeightModal, setTruckGrossWeightModal] = useState(false)
const [truckCurbWeightModal, setTruckCurbWeightModal] = useState(false)
const [truckPayloadWeightModal, setTruckPayloadWeightModal] = useState(false)
const [truckPassengerWeightModal, setTruckPassengerWeightModal] = useState(false)

  // modal for trailer weight info
const [trailerInfoModal, setTrailerInfoModal] = useState(false)


const [GVWRPic1, setGVWRPic1] = useState(false)


useEffect(()=> {
  {/* Calculates hitch weight */}
  setHitchWeight(Math.ceil((parseInt(trailerDryWeight) + parseInt(trailerCargoWeight) + parseInt(trailerWaterWeight)
                  + parseInt(trailerPropaneWeight)) * .15))
  {/* Calculates available weight that can be added in the trailer*/}
  setAvailableWeight(Math.ceil(parseInt(trailerGrossWeight) - (parseInt(trailerDryWeight) + parseInt(trailerCargoWeight) +
                  parseInt(trailerWaterWeight) + parseInt(trailerPropaneWeight))))
  {/* Calculates remaining payload weight */}
  setPayloadWeight(grossWeight - curbWeight - passengerWeight - petWeight -
                    cargoWeight - hitchWeight)
});

  return (
    <TouchableWithoutFeedback onPress={() => {
        Keyboard.dismiss();
    }}>

    <ScrollView>
    <View style={styles.truck}>

     {/* Icons at the top of the page. Used for navigating between the truck and trailer */}
      <View style={styles.icons}>
        <MaterialCommunityIcons name='truck-trailer'
          size={50}
          onPress={() => setTrailerInfoModal(true)}/><FontAwesome5 name='truck-pickup' 
          // style={styles.modalClose}
          size={40}
          color='#D3D3D3'/>
      </View>

  



     {/* Start of the truck weights page */}  
      <View style={styles.body}>

      {/* Truck Gross Vehicle Weight Rating */}
          <Text>Truck GVWR <AntDesign name='questioncircle' 
              size={15}
              style={styles.modalOpen}
              onPress={() => setTruckGrossWeightModal(true)}
           />
          </Text>
            <TextInput style={styles.input}
                        placeholder='0'
                        keyboardType='numeric'
                        onChangeText={(val) => setGrossWeight(val)}
                        selectTextOnFocus={true}
                        />
      {/* Information page for GVWR */}
            <Modal visible={truckGrossWeightModal} animationType='slide'>
              <View style={styles.modalContent}>
                <AntDesign name='closecircle' 
                    style={styles.modalClose}
                    size={30}
                    color='#333'
                    onPress={() => setTruckGrossWeightModal(false)}
                />
                <Text>  GVWR stands for Gross Vehicle Weight Rating. This weight varies
                      from vehicle to vehicle. This is the maximum
                      amount your truck can weigh. That includes your trucks curb weight,
                      weight of all passengers, weight of cargo in the truck and the hitch 
                      weight or pin weight of your trailer. You should be able to find
                      the sticker with these weights on the driver door jam.</Text>
                <View>
                  <TouchableOpacity  onPress={() => setGVWRPic1(true)}>
                    <Image source={require('./images/GVWR_Sticker1.jpg')}
                            style={styles.images}
                    />
                    <Image source={require('./images/GVWR_Sticker2.jpg')}
                            style={styles.images}
                    />
                  </TouchableOpacity>
                  <Modal visible={GVWRPic1} animationType='slide'
                          style={styles.pics}>
                    <View>
                      <AntDesign name='closecircle' 
                                style={styles.modalClose}
                                size={30}
                                color='#333'
                                onPress={() => setGVWRPic1(false)}
                      />
                    </View>
                  </Modal>
                </View>
              </View>
            </Modal>
      </View>

      <View style={styles.body}>
      {/* Vehicles curb weight */}
        <Text>Curb Weight <AntDesign 
            name='questioncircle' 
            size={15}
            onPress={() => setTruckCurbWeightModal(true)}
          />
          </Text>          
            <TextInput style={styles.input}
                        placeholder='0'
                        keyboardType='numeric'
                        onChangeText={(val) => setCurbWeight(val)}
                        selectTextOnFocus={true}
                        />    
      { /* modal for information on curb weight */}
            <Modal visible={truckCurbWeightModal} animationType='slide'>
              <View style={styles.modalContent}>
                <AntDesign name='closecircle' 
                    style={styles.modalClose}
                    size={30}
                    color='#333'
                    onPress={() => setTruckCurbWeightModal(false)}
                />
                <Text>  Curb weight is how much the vehicles weighs empty. This 
                      weight does not include any passengers, cargo, or trailer
                      weight. Most manufacturers also do not include the weight 
                      of fuel. The curb weight can be calculated by taking the
                      GVWR and subtracting the payload capacity. Both weights 
                      can be found on stickers located in the driver's door jam.
                      It's best to fill up your fuel tank and then get it weighed
                      at a CAT scale. That'll give you a more accurate weight.</Text>
                <View>
                  <TouchableOpacity  onPress={() => setGVWRPic1(true)}>
                    <Image source={require('./images/GVWR_Sticker2.jpg')}
                            style={styles.images}
                    />
                    <Image source={require('./images/Curb_Weight_Sticker.jpg')}
                            style={styles.images}
                    />
                  </TouchableOpacity>
                  <Modal visible={GVWRPic1} animationType='slide'
                          style={styles.pics}>
                    <View>
                      <AntDesign name='closecircle' 
                                style={styles.modalClose}
                                size={30}
                                color='#333'
                                onPress={() => setGVWRPic1(false)}
                      />
                    </View>
                  </Modal>
                </View>
              </View>
            </Modal>                    
      </View>
          
      <View style={styles.body}>
       {/* passenger weight */}
            <Text>Passenger Weight <AntDesign name='questioncircle' 
              size={15} onPress={() => setTruckPassengerWeightModal(true)}
            /></Text>          
                <TextInput style={styles.input}
                            placeholder='0'
                            keyboardType='numeric'
                            onChangeText={(val) => setPassengerWeight(val)} 
                            selectTextOnFocus={true}
                            />
      {/* modal for passenger weight information */}
              <Modal visible={truckPassengerWeightModal} animationType='slide'>
                <View style={styles.modalContent}>
                  <AntDesign name='closecircle' 
                      style={styles.modalClose}
                      size={30}
                      color='#333'
                      onPress={() => setTruckPassengerWeightModal(false)}
                  />
                  <Text>  Weight of all passengers. If you weighed your truck
                        at the scales with you in it and you are using that weight
                        to calculate the payload, don't include your weight in 
                        this figure.
                  </Text>
                </View>
              </Modal>
      </View>

      <View style={styles.body}>
            <Text>Pet Weight <AntDesign name='questioncircle' 
              size={15}
            /></Text>          
                <TextInput style={styles.input}
                            placeholder='0'
                            keyboardType='numeric'
                            onChangeText={(val) => setPetWeight(val)} 
                            selectTextOnFocus={true}
                            />
      </View>

      <View style={styles.body}>
      {/* cargo weight */}
            <Text>Cargo Weight <AntDesign name='questioncircle' 
              size={15}
            /></Text>          
                <TextInput style={styles.input}
                            placeholder='0'
                            keyboardType='numeric'
                            onChangeText={(val) => setCargoWeight(val)} 
                            selectTextOnFocus={true}
                            />
      </View>

      <View style={styles.body}>
              <Text style={styles.footer}><AntDesign name='questioncircle' size={15} onPress={() => setTruckPayloadWeightModal(true)}/> Available Payload: {payloadWeight}</Text>  
              <Modal visible={truckPayloadWeightModal} animationType='slide'>
              <View style={styles.modalContent}>
                <AntDesign name='closecircle' 
                    style={styles.modalClose}
                    size={30}
                    color='#333'
                    onPress={() => setTruckPayloadWeightModal(false)}
                />
                <Text>    A vehicles payload capacity is the total amount of weight added 
                        to the vehicles curb weight. This would include any passengers, 
                        pets, cargo and weight the trailer puts on the truck. The payload
                        capacity equals the vehicles GVWR minus the vehicles curb weight.
                        However, the curb weight isn't on any of the stickers.
                        There is a sticker typically on the driver's door jam. This sticker
                        also gives the manufacturers recommended tire size and psi. </Text>
                <View>
                  <TouchableOpacity  onPress={() => setGVWRPic1(true)}>
                    <Image source={require('./images/Curb_Weight_Sticker.jpg')}
                            style={styles.images}
                    />
                  </TouchableOpacity>
                  <Modal visible={GVWRPic1} animationType='slide'
                          style={styles.pics}>
                    <View>
                      <AntDesign name='closecircle' 
                                style={styles.modalClose}
                                size={30}
                                color='#333'
                                onPress={() => setGVWRPic1(false)}
                      />
                    </View>
                  </Modal>
                </View>
              </View>
            </Modal>
              <Text style={styles.footer}><AntDesign name='questioncircle' size={15}/> Available Trailer Weight: {availableWeight}</Text> 
              <Text style={styles.footer}><AntDesign name='questioncircle' size={15}/> Hitch/Pin Weight: {hitchWeight}</Text>         
      </View>
     




     {/* This starts the modal for the trailer weights page */}
      <Modal visible={trailerInfoModal}
                animationType='fade'>
          <View style={styles.body}>
          
            <View style={styles.iconsModal}>
              <MaterialCommunityIcons name='truck-trailer'
                                      size={50}
                                      color='#D3D3D3'
              />
              <FontAwesome5 name='truck-pickup' 
                            // style={styles.modalClose}
                            size={40}
                            onPress={() => setTrailerInfoModal(false)}/>
            </View>
              <Text>Trailer GVWR <AntDesign name='questioncircle' 
                                            size={15}
                                            style={styles.modalOpen}
                                            onPress={() => setTruckGrossWeightModal(true)}/>
              </Text>          
                <TextInput style={styles.input}
                          defaultValue = {trailerGrossWeight}
                          keyboardType='numeric'
                          onChangeText = {(val) => setTrailerGrossWeight(val)}
                          selectTextOnFocus={true}
                />
            </View> 
            <View style={styles.body}>
              <Text>Trailer Dry Weight</Text>          
                <TextInput style={styles.input}
                            defaultValue= {trailerDryWeight}
                            keyboardType='numeric'
                            onChangeText={(val) => setTrailerDryWeight(val)}
                            selectTextOnFocus={true}
                            />
            </View>

            <View style={styles.body}>
                  <Text>Cargo Weight</Text>          
                      <TextInput style={styles.input}
                                  placeholder={'0'}
                                  defaultValue={trailerCargoWeight}
                                  keyboardType='numeric'
                                  onChangeText={(val) => setTrailerCargoWeight(val)}
                                  selectTextOnFocus={true} />
            </View>

            <View style={styles.body}>
                  <Text>Water Weight</Text>          
                      <TextInput style={styles.input}
                                  defaultValue={trailerWaterWeight}
                                  keyboardType='numeric'
                                  onChangeText={(val) => setTrailerWaterWeight(val)}
                                  selectTextOnFocus={true} />
            </View>

            <View style={styles.body}>
                  <Text>Propane Weight:</Text>          
                      <TextInput style={styles.input}
                                  defaultValue={trailerPropaneWeight}
                                  keyboardType='numeric'
                                  onChangeText={(val) => setTrailerPropaneWeight(val)} 
                                  selectTextOnFocus={true}
                                  />
            </View>

            <View style={styles.body}>
              <Text style={styles.footer}>Trailer Available Weight: {availableWeight}</Text>
              <Text style={styles.footer}>Hitch/Pin Weight: {hitchWeight}</Text>          
            </View>
      </Modal>
      

          <StatusBar style="auto" />
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}


{/* Beginning of the stylsheet */}
const styles = StyleSheet.create({
  truck: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boldText: {
    fontWeight: 'bold',
  },
  body: {
    alignItems: 'center',
    padding: 15, 
  },
  input: {
    borderWidth: 1,
    borderColor: '#777',
    borderRadius: 15,
    padding: 8,
    margin: 10,
    width: 200,
  },
  modalOpen: {
    marginVertical: 30,
  },
  modalClose: {
    alignSelf: 'center',
    margin: 15,
  },
  modalContent: {
    margin: 10,
    size: 20,
  },
  images: {
    height: 300,
    width: 400,
  },
  icons: {
    flexDirection: 'row',
  },
  iconsModal: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  footer: {
    margin: 10,
  }
});