import logo from './logo.svg';
import React, {useEffect, useState} from 'react';
import { Credential, BioSample } from "@digitalpersona/core";
import { FingerprintsAuth } from '@digitalpersona/authentication';
import { IAuthService, ServiceError } from '@digitalpersona/services';
import { FingerprintReader, QualityCode, ErrorOccurred, SampleFormat } from '@digitalpersona/devices';
import './App.css';

function App() {
   const reader = FingerprintReader();
   let samples = BioSample;
   let minSamples = 4;
   let minFinger = 1;
   let maxFinger = 10;
   const [readerConnected, setreaderConnected] = useState(false)
   const [device, setdevice] = useState([])
  const [sample, setsamples] = useState([])
   const [state, setState] = useState({
  step: 0,device:[]
}); 
useEffect(() => {
  (device) => {
    reader.onDeviceConnected()
  }
  setreaderConnected(true)
})
const submit = (data) => {
        try {
            const auth = new FingerprintsAuth(IAuthService);
            setsamples({samples: BioSample[data]})
            console.log('fingerprint acquired')
        }
        catch (error) {
          console.log('fingerprint not acuired')
        }
    }
reader.onDeviceConnected = async (device) => {
  await updateReaderStatus();
  console.log('Device is connected')
}
reader.onDeviceDisconnected = async (device) => {
              await this.updateReaderStatus();
              console.log('device is diconnected')
}
reader.onSamplesAcquired = async (data) => {
            await submit(data.samples);
        };
const updateReaderStatus = async () => {
  try {
    const devices =  await reader.enumerateDevices();
    setreaderConnected({readerConnected : devices.length > 0}) 
  } catch (err) {
    setreaderConnected({readerConnected : false});
  }
}
const capture = function () {
  reader.startAcquisition(SampleFormat.PngImage);
}
  return (
    <div className="App">
      <form className="enrollement-form" onSubmit={submit}>
    <button
        className={'primary btn'}
        style={{width:'200px', margin:'0 auto', marginBottom: '30px'}} onClick={capture}>
           Capture Fingerprint
        </button>
        </form>
    </div>
  );
}

export default App;