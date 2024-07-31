const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');
const startCallButton = document.getElementById('startCall');
const screenShareButton = document.getElementById('screenShare');
const fileInput = document.getElementById('fileInput');
const uploadFileButton = document.getElementById('uploadFile');

let localStream;
let remoteStream;
let peerConnection;
const configuration = {
  iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
};

// Get media devices
async function startCall() {
  try {
    localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localVideo.srcObject = localStream;

    peerConnection = new RTCPeerConnection(configuration);

    // Add local stream tracks to peer connection
    localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

    // When remote stream is added
    peerConnection.ontrack = event => {
      remoteStream = event.streams[0];
      remoteVideo.srcObject = remoteStream;
    };

    // Create an offer
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    
    // For simplicity, we'll just log the offer and answer here
    console.log('Offer:', offer);

  } catch (error) {
    console.error('Error accessing media devices.', error);
  }
}

async function handleScreenShare() {
  try {
    const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
    localVideo.srcObject = screenStream;

    // Add screen stream tracks to peer connection
    screenStream.getTracks().forEach(track => peerConnection.addTrack(track, screenStream));

  } catch (error) {
    console.error('Error sharing screen.', error);
  }
}

function handleFileUpload() {
  const file = fileInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      console.log('File content:', reader.result);
      // Handle file upload logic here
    };
    reader.readAsText(file);
  }
}

// Event Listeners
startCallButton.addEventListener('click', startCall);
screenShareButton.addEventListener('click', handleScreenShare);
uploadFileButton.addEventListener('click', handleFileUpload);
