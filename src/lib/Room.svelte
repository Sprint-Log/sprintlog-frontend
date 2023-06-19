<script lang="ts">
	import { writable } from 'svelte/store';
	import { getLiveToken } from '$lib/api/sprintlog';
	import type { Token } from '$lib/types/sprintlog';
	import { PUBLIC_API_URL, PUBLIC_LIVE_URL } from '$env/static/public';

	const roomName = 'my-room';
	let roomId = '';
	import type {
		Participant,
		RemoteParticipant,
		RemoteTrack,
		RemoteTrackPublication,
		LocalTrackPublication
	} from 'livekit-client';
	import { RoomEvent, Room, Track, LocalParticipant } from 'livekit-client';
	function handleTrackUnsubscribed(
		track: RemoteTrack,
		publication: RemoteTrackPublication,
		participant: RemoteParticipant
	) {
		// remove tracks from all attached elements
		track.detach();
	}

	function handleLocalTrackUnpublished(
		track: LocalTrackPublication,
		participant: LocalParticipant
	) {
		// when local tracks are ended, update UI to remove them from rendering
		// track.detach();
	}

	function handleActiveSpeakerChange(speakers: Participant[]) {
		// show UI indicators when participant is speaking
	}

	function handleDisconnect() {
		console.log('disconnected from room');
	}

	function handleTrackSubscribed(
		track: RemoteTrack,
		publication: RemoteTrackPublication,
		participant: RemoteParticipant
	) {
		if (track.kind === Track.Kind.Video || track.kind === Track.Kind.Audio) {
			// attach it to a new HTMLVideoElement or HTMLAudioElement
			const element = track.attach();
			// parentElement.appendChild(element);
		}
	}
	let participants: Map<string, RemoteParticipant>;
	// creates a new room with options
	const joinRoom = async () => {
		const room = new Room({
			// automatically manage subscribed video quality
			adaptiveStream: true,

			// optimize publishing bandwidth and CPU for published tracks
			dynacast: true

			// default capture settings
		});

		// set up event listeners
		room
			.on(RoomEvent.TrackSubscribed, handleTrackSubscribed)
			.on(RoomEvent.TrackUnsubscribed, handleTrackUnsubscribed)
			.on(RoomEvent.ActiveSpeakersChanged, handleActiveSpeakerChange)
			.on(RoomEvent.Disconnected, handleDisconnect)
			.on(RoomEvent.LocalTrackUnpublished, handleLocalTrackUnpublished);

		// connect to room
		let token = await getLiveToken(roomId);
		room.connect(PUBLIC_LIVE_URL, token.token);
		console.log('connected to room', room.name);
		participants = room.participants;
		// publish local camera and mic tracks
		room.localParticipant.enableCameraAndMicrophone();
	};
</script>

<div class="bg-gray-100 rounded-lg p-2 w-80">
	<button
		class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
		on:click={joinRoom}
	>
		Join
	</button>
	<ul class="mt-2">
		{#each participants as participant}
			<li class="flex items-center py-1">
				<span class="text-gray-800">{participant.identity}</span>
				{#if participant.audioTracks}
					<svg class="h-4 w-4 ml-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
						<path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
						<path
							fill-rule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zm0-6a2 2 0 110-4 2 2 0 010 4z"
							clip-rule="evenodd"
						/>
					</svg>
				{/if}
			</li>
		{/each}
	</ul>
</div>
