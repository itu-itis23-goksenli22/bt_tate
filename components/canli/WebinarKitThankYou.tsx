// WebinarKit thank-you embed — /canli/kayitbasarili sayfası.
// Kayıt /canli'de olur; bu sayfa geri sayım gösterir + süre dolunca OTOMATİK
// watch room'a yönlendirir (ewk_v7 yapar). Label'lar Türkçe/canlı temaya
// çevrildi. CSP (vercel.json) webinarkit.com + jsdelivr'a izin veriyor.

const TY_HTML = `<style>@media (max-width: 999999999px) {  #wk_element_5593219dd237183413d27d0e5acd74ac { width: 540px; max-width: 100%; min-height: 16px; padding: 0px; margin: 0px auto; border-style: none; background: rgba(0, 0, 0, 0); }  #wk_element_5593219dd237183413d27d0e5acd74ac_calendar { background: rgb(51, 94, 234); }  #wk_element_45f8e93c3ca45229d03dbfdfd50fb418 { width: 540px; max-width: 100%; min-height: 16px; padding: 0px 16px 16px; margin: 0px auto; border-style: none; background: rgba(0, 0, 0, 0); }  #wk_element_d1217a9bd4050e903e6ed0eb69757d18 { width: 100%; max-width: 100%; min-height: 0px; padding: 0px; margin: 0px; border-style: none; background: rgba(0, 0, 0, 0); font-family: HKGroteskPro, serif; font-size: 16px; line-height: 1.35; letter-spacing: 0px; }  #wk_element_d1217a9bd4050e903e6ed0eb69757d18 :not(:last-child) { margin-bottom: 0px; }  #wk_element_3faa4a3b321e808bea1bb2a1728b1a2b { width: 540px; max-width: 100%; min-height: 16px; padding: 0px; margin: 0px auto 16px; border-style: none; background: rgba(0, 0, 0, 0); }  #wk_element_ef686ab4d9d28244630f2a52414694f4 { max-width: 540px; min-height: 16px; padding: 16px; margin: 0px auto; border-style: solid; border-color: rgb(255, 255, 255); border-width: 0px; border-radius: 16px; background: rgb(255, 255, 255); }  #wk_element_c6dd61bac74fea356fdc37879dfce67d { width: 100%; max-width: 100%; min-height: 0px; padding: 0px; margin: 0px; border-style: none; background: rgba(0, 0, 0, 0); font-family: HKGroteskPro, serif; font-size: 16px; line-height: 1.5; letter-spacing: 0px; display: flex; }  #wk_element_c6dd61bac74fea356fdc37879dfce67d :not(:last-child) { margin-bottom: 0px; }  #wk_element_e8f171a2c4dca2835f2cf81ff6b3ccba { width: 540px; max-width: 100%; min-height: 16px; padding: 0px; margin: 0px auto; border-style: none; background: rgba(0, 0, 0, 0); }  #wk_element_3faa4a3b321e808bea1bb2a1728b1a2b_calendar { background: rgb(51, 94, 234); }}@media (max-width: 992px) {}@media (max-width: 768px) {}</style><div class="wk_root" style="width: 100%; z-index: 100000;"><div class="wk_ascend_tree wk_editor_hide_tooltips col-12 col-md my-auto shadow wk_column" id="wk_element_ef686ab4d9d28244630f2a52414694f4" data-custom-css-classes="shadow" data-wk-background-type="solid" data-wk-border-style="solid" data-wk-border-style-desktop="solid" data-wk-background-type-desktop="solid"> <div class="wk_editor_hide_tooltips wk_thank_you_timer" calendar="hide" data-classes="wk_thank_you_timer" data-wk-date-format-type="tr-TR" data-wk-days-label="gün" data-wk-entering-label="🔴 Canlı yayın odasına giriliyor..." data-wk-expired-label="Bu canlı yayın sona erdi." data-wk-hours-label="saat" data-wk-minutes-label="dakika" data-wk-seconds-label="saniye" data-wk-starts-in-label="🔴 Canlı yayına kalan süre:" data-wk-webinar-id="6a41a845d47c4bb5a2f75f76" id="wk_element_3faa4a3b321e808bea1bb2a1728b1a2b" timer_size="small" data-wk-border-style-desktop="default" data-wk-background-type-desktop="default"> <div class="wk_row_internal mx-0"> <div class="wk_timer px-0 col"> <div class="rounded-2 mx-auto shadow wk_calendar" style="max-width:170px; background: #fff; display: none"> <div class="wk_calendar_color" style="border-top-left-radius: .375rem; border-top-right-radius: .375rem" id="wk_element_3faa4a3b321e808bea1bb2a1728b1a2b_calendar"> <h5 class="text-center fw-bold py-2 text-uppercase text-white wk_calendar_month">Temmuz</h5> </div> <h1 class="text-center fw-bold mb-2 pb-2 wk_calendar_day">6</h1> </div> <h5 class="text-center mb-4 mt-5 wk_calendar_header" style="display:none"><i class="fa-clock fa-regular"></i><span class="wk_calendar_time"> 18:29 GMT+3</span></h5> <h6 class="text-center fw-bold wk_timer_header">🔴 Canlı yayına kalan süre:</h6> <div class="wk_row_internal mx-auto wk_timer_row"> <div class="px-0 col-3"> <h5 class="text-center mb-0 wk_timer_days">0</h5> <h6 class="text-center mb-0 wk_timer_days_label">gün</h6> </div> <div class="px-0 col-3"> <h5 class="text-center mb-0 wk_timer_hours">0</h5> <h6 class="text-center mb-0 wk_timer_hours_label">saat</h6> </div> <div class="px-0 col-3"> <h5 class="text-center mb-0 wk_timer_minutes">0</h5> <h6 class="text-center mb-0 wk_timer_minutes_label">dakika</h6> </div> <div class="px-0 col-3"> <h5 class="text-center mb-0 wk_timer_seconds">0</h5> <h6 class="text-center mb-0 wk_timer_seconds_label">saniye</h6> </div> </div> </div> </div> </div> <div class="wk_thank_you_session_link" id="wk_element_e8f171a2c4dca2835f2cf81ff6b3ccba" data-classes="wk_thank_you_session_link" data-wk-webinar-id="6a41a845d47c4bb5a2f75f76" data-wk-background-type-desktop="default" data-wk-border-style-desktop="default"> <div class="wk_ascend_tree wk_row_internal mx-0"> <div class="text-center col mx-auto px-0 wk_ascend_tree"> <div class="wk_ascend_tree wk_editor_hide_tooltips wk_text" id="wk_element_c6dd61bac74fea356fdc37879dfce67d" data-wk-background-type-desktop="default" data-wk-border-style-desktop="default"> <div contenteditable="false" style="width: 100%; margin-top: auto; margin-bottom: auto;"> <h6><b>Canlı yayın linkiniz:</b></h6> </div> </div> <div class="input-group input-group-lg mt-1"><input class="form-control wk_webinar_session_link" style="background-color: #f1f4f8; border-color: #f1f4f8;" readonly=""><button class="btn wk_copy_link_button" data-bs-container="body" data-bs-content="Link kopyalandı!" data-bs-original-title="" data-bs-placement="top" data-bs-toggle="popover" style="color: inherit; background-color: rgba(80,102,144,.1)" type="button"><i class="fa-copy far" style="width: 19.125px"></i></button></div> </div> </div> </div> </div></div>`;

const TY_OVERRIDE_CSS = `
#wk-canli-ty .col { flex: 1 0 0%; }
#wk-canli-ty .col-3 { flex: 0 0 auto; width: 25%; }
#wk-canli-ty .col-12 { flex: 0 0 auto; width: 100%; }
#wk-canli-ty .col-md { flex: 1 0 0%; }
#wk-canli-ty .wk_row_internal { display: flex; flex-wrap: wrap; margin-left: 0; margin-right: 0; }
#wk-canli-ty .wk_timer_row { display: flex; flex-wrap: nowrap; }
#wk-canli-ty * { box-sizing: border-box; }
#wk-canli-ty .text-center { text-align: center; }
#wk-canli-ty .fw-bold { font-weight: 700; }
#wk-canli-ty .mx-auto { margin-left: auto; margin-right: auto; }
#wk-canli-ty .mx-0 { margin-left: 0; margin-right: 0; }
#wk-canli-ty .px-0 { padding-left: 0; padding-right: 0; }
#wk-canli-ty .mb-0 { margin-bottom: 0; }
#wk-canli-ty .mb-2 { margin-bottom: 0.5rem; }
#wk-canli-ty .mb-4 { margin-bottom: 1.5rem; }
#wk-canli-ty .mt-1 { margin-top: 0.25rem; }
#wk-canli-ty .mt-5 { margin-top: 2.5rem; }
#wk-canli-ty .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
#wk-canli-ty .pb-2 { padding-bottom: 0.5rem; }
#wk-canli-ty .input-group { display: flex; align-items: stretch; width: 100%; }
#wk-canli-ty .input-group .form-control { flex: 1 1 auto; width: 1%; min-width: 0; }
#wk-canli-ty .input-group .btn { flex: 0 0 auto; cursor: pointer; }
#wk-canli-ty .wk_column { background: #1A1A1A !important; color: #FFFFFF !important; border-radius: 16px !important; border-color: rgba(255,255,255,0.08) !important; }
#wk-canli-ty .wk_timer_header { color: #E8C872 !important; }
#wk-canli-ty .wk_timer_days, #wk-canli-ty .wk_timer_hours, #wk-canli-ty .wk_timer_minutes, #wk-canli-ty .wk_timer_seconds,
#wk-canli-ty .wk_timer_days_label, #wk-canli-ty .wk_timer_hours_label, #wk-canli-ty .wk_timer_minutes_label, #wk-canli-ty .wk_timer_seconds_label { color: #FFFFFF !important; }
#wk-canli-ty .wk_text, #wk-canli-ty .wk_text h6, #wk-canli-ty .wk_text b { color: #FFFFFF !important; }
#wk-canli-ty .wk_webinar_session_link { background-color: #242424 !important; border-color: #3A3A3A !important; color: #FFFFFF !important; padding: 0.6rem 0.9rem; border: 1px solid #3A3A3A; border-radius: 10px 0 0 10px; }
#wk-canli-ty .wk_copy_link_button { background-color: #FBBF24 !important; color: #000000 !important; border-radius: 0 10px 10px 0; padding: 0 1rem; }
#wk-canli-ty .wk_copy_link_button:hover { background-color: #F59E0B !important; }
`;

export default function WebinarKitThankYou() {
  return (
    <div id="wk-canli-ty" className="w-full max-w-[540px] mx-auto">
      <style dangerouslySetInnerHTML={{ __html: TY_OVERRIDE_CSS }} />
      <div dangerouslySetInnerHTML={{ __html: TY_HTML }} />

      {/* Step 2 — gerçek <script> tag'leri (CSP izinli). */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/intl-tel-input@19.5.6/build/css/intlTelInput.css"
      />
      <link rel="stylesheet" href="https://webinarkit.com/css/ewk_v5.css?cache=5" />
      {/* eslint-disable @next/next/no-sync-scripts */}
      <script src="https://cdn.jsdelivr.net/npm/intl-tel-input@19.5.6/build/js/intlTelInput.min.js" />
      <script src="https://cdn.jsdelivr.net/npm/luxon@3.4.4/build/global/luxon.min.js" />
      <script src="https://webinarkit.com/js/ewk_v7.js?v=7" />
      <script src="https://webinarkit.com/js/ewk_i.js?v=1" />
      {/* eslint-enable @next/next/no-sync-scripts */}
    </div>
  );
}
