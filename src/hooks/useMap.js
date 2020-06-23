import {useEffect, useState} from "react";
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css';

export default function useMap(ref, markRef, initialViewport) {
    const [ viewport, setViewport ] = useState(initialViewport)

    useEffect(() => {

        const map = new mapboxgl.Map({
            accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
            container: ref.current,
            style: process.env.REACT_APP_MAP,
            center: [viewport.longitude, viewport.latitude],
            zoom: viewport.zoom
        });

        const marker = new mapboxgl.Marker({
            element: markRef.current,
            anchor: 'bottom'
        })
            .setLngLat([viewport.longitude, viewport.latitude])
            .addTo(map)
        map.on('move', () => {
            const longitude = +map.getCenter().lng.toFixed(7);
            const latitude = +map.getCenter().lat.toFixed(7);

            marker.setLngLat([longitude, latitude])
            setViewport({
                longitude,
                latitude,
                zoom: +map.getZoom()
            });
        });

        const scale = new mapboxgl.ScaleControl({
            maxWidth: 80,
            unit: 'imperial'
        });
        map.addControl(scale);

        scale.setUnit('metric');

        return () => {
            mapboxgl.clearStorage();
        }

    }, [])

    return viewport
}