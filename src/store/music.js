import { createSlice } from '@reduxjs/toolkit';
import { DataProvider } from 'recyclerlistview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';

const slice = createSlice({
    name: 'music',
    initialState: {
        audioFiles: [],
        playList: [
            {
                name: "Recently Played",
                albumArt: require("../assets/images/playlist_cover1.png"),
                tracks: [],
            },
            {
                name: "All Songs",
                albumArt: require("../assets/images/playlist_cover2.png"),
                tracks: [],
            },
        ],
        addToPlayList: null,
        permissionError: false,
        dataProvider: new DataProvider((r1, r2) => r1 !== r2),
        playbackObj: null,
        soundObj: null,
        currentAudio: {},
        isPlaying: false,
        isPlayListRunning: false,
        activePlayList: [],
        currentAudioIndex: null,
        playbackPosition: null,
        playbackDuration: null,
    },
    totalAudioCount = 0,
    reducers: {
        // Getting the audio files from redux
        setAudioFiles: async (state, action) => {
            const { dataProvider, audioFiles } = state;
            let media = await MediaLibrary.getAssetsAsync({
                mediaType: 'audio',
            });
            media = await MediaLibrary.getAssetsAsync({
                mediaType: 'audio',
                first: media.totalCount,
                sortBy: [MediaLibrary.SortBy.default]
            });
            this.totalAudioCount = media.totalCount;
            this.setState({
                ...this.state,
                dataProvider: dataProvider.cloneWithRows([
                    ...audioFiles,
                    ...media.assets,
                ]),
                audioFiles: [...audioFiles, ...media.assets],
            });
        },
        // Adding the audio files to the playlist
        loadPreviousAudio: async (state, action) => {
            let previousAudio = await AsyncStorage.getItem('previousAudio');
            let currentAudio;
            let currentAudioIndex;

            if (previousAudio === null) {
                currentAudio = this.state.audioFiles[0];
                currentAudioIndex = 0;
            } else {
                previousAudio = JSON.parse(previousAudio);
                currentAudio = previousAudio.audio;
                currentAudioIndex = previousAudio.index;
            }
            this.setState({ ...this.state, currentAudio, currentAudioIndex });
        },
        // Load previous audio from async storage, to be changed when i use redux persist
        loadPreviousAudio: async (state, action) => {
            const permission = await MediaLibrary.getPermissionsAsync();
            if (permission.granted) this.getAudioFiles()

            if (!permission.canAskAgain && !permission.granted) {
                this.setState({ ...this.state, permissionError: true });
            }

            if (!permission.granted && permission.canAskAgain) {
                const { status, canAskAgain } = await MediaLibrary.requestPermissionsAsync();
                if (status === 'denied' && canAskAgain) this.permissionAllert()
                if (status === 'granted') this.getAudioFiles()
                if (status === 'denied' && !canAskAgain) {
                    state.permissionError = true;
                }
            }
        },
        // set of events to happen when playback state is updated
        onPlaybackStatusUpdate = async (state, action) => {
            if (playbackStatus.isLoaded && playbackStatus.isPlaying) {
                this.updateState(this, {
                    playbackPosition: playbackStatus.positionMillis,
                    playbackDuration: playbackStatus.durationMillis,
                });
            }

            if (playbackStatus.isLoaded && !playbackStatus.isPlaying) {
                storeAudioForNextOpening(
                    this.state.currentAudio,
                    this.state.currentAudioIndex,
                    playbackStatus.positionMillis
                );
            }

            if (playbackStatus.didJustFinish) {
                if (this.state.isPlayListRunning) {
                    let audio;
                    const indexOnPlayList = this.state.activePlayList.audios.findIndex(
                        ({ id }) => id === this.state.currentAudio.id
                    );
                    const nextIndex = indexOnPlayList + 1;
                    audio = this.state.activePlayList.audios[nextIndex];

                    if (!audio) audio = this.state.activePlayList.audios[0];

                    const indexOnAllList = this.state.audioFiles.findIndex(
                        ({ id }) => id === audio.id
                    );

                    const status = await playNext(this.state.playbackObj, audio.uri);
                    return this.updateState(this, {
                        soundObj: status,
                        isPlaying: true,
                        currentAudio: audio,
                        currentAudioIndex: indexOnAllList,
                    });
                }

                const nextAudioIndex = this.state.currentAudioIndex + 1;
                // there is no next audio to play or the current audio is the last
                if (nextAudioIndex >= this.totalAudioCount) {
                    this.state.playbackObj.unloadAsync();
                    this.updateState(this, {
                        soundObj: null,
                        currentAudio: this.state.audioFiles[0],
                        isPlaying: false,
                        currentAudioIndex: 0,
                        playbackPosition: null,
                        playbackDuration: null,
                    });
                    return await storeAudioForNextOpening(this.state.audioFiles[0], 0);
                }
                // otherwise we want to select the next audio
                const audio = this.state.audioFiles[nextAudioIndex];
                const status = await playNext(this.state.playbackObj, audio.uri);
                this.updateState(this, {
                    soundObj: status,
                    currentAudio: audio,
                    isPlaying: true,
                    currentAudioIndex: nextAudioIndex,
                });
                await storeAudioForNextOpening(audio, nextAudioIndex);
            }
        };

    },
});

export default slice.reducer;

export const {} = slice.actions;
