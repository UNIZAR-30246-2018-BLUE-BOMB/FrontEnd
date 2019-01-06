export interface ShortResponse {
  sequence: string;
  shortedUrl: string;
  qrReferenceUrl: string;

  infoUrlRequestChannel: string;
  infoUrlListenChannel: string;
  infoUrlErrorChannel: string;

  dailyStatsOperatingSystemUrl: string;
  dailyStatsBrowserUrl: string;

  globalStatsRequestOperatingSystemChannel: string;
  globalStatsRequestBrowserChannel: string;
  globalStatsListenChannel: string;
  globalStatsErrorChannel: string;

  globalStatsOperatingSystemChangesListenChannel: string;
  globalStatsBrowserChangesListenChannel: string;

  adsUrl: string;
}
