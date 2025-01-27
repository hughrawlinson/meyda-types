// Type definitions for meyda 4.2
// Project: https://github.com/meyda/meyda
// Definitions by: Damien Erambert <https://github.com/eramdam>
//                 Hugh Rawlinson <https://github.com/hughrawlinson>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module 'meyda' {
  export type MeydaWindowingFunction =
      | "blackman"
      | "sine"
      | "hanning"
      | "hamming";
  export type MeydaAudioFeature =
      | "amplitudeSpectrum"
      | "chroma"
      | "complexSpectrum"
      | "energy"
      | "loudness"
      | "mfcc"
      | "perceptualSharpness"
      | "perceptualSpread"
      | "powerSpectrum"
      | "rms"
      | "spectralCentroid"
      | "spectralFlatness"
      | "spectralFlux"
      | "spectralKurtosis"
      | "spectralRolloff"
      | "spectralSkewness"
      | "spectralSlope"
      | "spectralSpread"
      | "zcr"
      | "buffer";

  export type MeydaSignal = SliceableArrayLike<number>;
  export interface SliceableArrayLike<T> extends ArrayLike<T> {
      slice(start: number, end: number): SliceableArrayLike<T>;
  }

  type MeydaSource = AudioNode;

  export interface MeydaFeaturesObject {
      amplitudeSpectrum: Float32Array;
      buffer: Array<number>;
      chroma: Array<number>;
      complexSpectrum: {
          real: Array<number>;
          imag: Array<number>;
      };
      energy: number;
      loudness: {
          specific: Float32Array;
          total: number;
      };
      mfcc: Array<number>;
      perceptualSharpness: number;
      perceptualSpread: number;
      powerSpectrum: Float32Array;
      rms: number;
      spectralCentroid: number;
      spectralFlatness: number;
      spectralKurtosis: number;
      spectralRolloff: number;
      spectralSkewness: number;
      spectralSlope: number;
      spectralSpread: number;
      zcr: number;
  }

  export class MeydaAnalyzer {
      start(features: Array<MeydaAudioFeature>): void;

      stop(): void;

      setSource(source: MeydaSource): void;

      get(
          features: Array<MeydaAudioFeature>
      ): Partial<MeydaFeaturesObject> | null;
  }

  interface Meyda {
      audioContext: AudioContext | null;
      spn: ScriptProcessorNode | null;
      bufferSize: number;
      sampleRate: number;
      melBands: number;
      chromaBands: number;
      callback: Function | null;
      windowingFunction: MeydaWindowingFunction;
      featureExtractors: any;
      EXTRACTION_STARTED: boolean;
      numberOfMFCCCoefficients: number;
      windowing(
          signal: MeydaSignal,
          windowname?: MeydaWindowingFunction
      ): MeydaSignal;

      createMeydaAnalyzer(options: MeydaAnalyzerOptions): MeydaAnalyzer;
      extract(
          feature: MeydaAudioFeature | Array<MeydaAudioFeature>,
          signal: MeydaSignal,
          previousSignal?: MeydaSignal
      ): Partial<MeydaFeaturesObject> | null;
  }

  export const main: Meyda;

  export default main;

  export function extract(
      feature: MeydaAudioFeature | Array<MeydaAudioFeature>,
      signal: MeydaSignal,
      previousSignal?: MeydaSignal
  ): Partial<MeydaFeaturesObject> | null;

  interface MeydaAnalyzerOptions {
      audioContext: AudioContext;
      source: MeydaSource;
      bufferSize: number;
      hopSize?: number;
      windowingFunction?: MeydaWindowingFunction;
      featureExtractors?: MeydaAudioFeature | Array<MeydaAudioFeature>;
      callback?: (features: Partial<MeydaFeaturesObject>) => void;
  }
}