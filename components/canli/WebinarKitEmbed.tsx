// WebinarKit "just-in-time" canlı webinar — embed registration form.
// Webinar ID: 6a41a845d47c4bb5a2f75f76
//
// SERVER component — Step 2 script'leri GERÇEK <script> tag'i olarak
// (parser-inserted) formun HEMEN ALTINA basılıyor (WebinarKit dokümanının
// dediği gibi). document.currentScript düzgün çalışır.
//
// ÖNEMLİ: Bu script'lerin çalışması için site CSP'sinde (vercel.json)
// webinarkit.com + cdn.jsdelivr.net izinli olmalı (script-src/style-src/
// connect-src/font-src). CSP eksikti → script'ler bloklanıyordu → sayaç
// boş kalıyordu. CSP'ye eklendi.
//
// OVERRIDE_CSS: WebinarKit'in beyaz temasını /katil temasına (koyu #1A1A1A +
// altın #FBBF24) çevirir + formun dayandığı Bootstrap class'larının scope'lu
// (#wk-canli-embed) subset'ini sağlar (embed Bootstrap yüklemiyor).

const FORM_HTML = `<style>@media (max-width: 999999999px) {  #wk_element_399409224331983c0bb3717d18e66cc0 { width: 100%; max-width: 100%; min-height: 16px; padding: 16px; margin: 0px auto; border-style: solid; border-color: rgb(255, 255, 255); border-width: 0px; border-radius: 16px; background: rgb(255, 255, 255); }  #wk_element_889d2c8b54ae5001837c2ec42ca72c7e { width: 100%; max-width: 100%; min-height: 0px; padding: 0px; margin: 0px; border-style: none; background: rgba(0, 0, 0, 0); font-family: HKGroteskPro, serif; font-size: 16px; line-height: 1.35; letter-spacing: 0px; display: flex; }  #wk_element_889d2c8b54ae5001837c2ec42ca72c7e :not(:last-child) { margin-bottom: 0px; }  #wk_element_399409224331983c0bb3717d18e66cc0_checkbox { color: rgb(0, 0, 0); }  #wk_element_6aef8c2761d05f7a7fee01f707ee3d9f { width: 100%; max-width: 100%; min-height: 0px; padding: 8px 16px; margin: 0px; color: rgb(255, 255, 255); border-style: solid; border-color: rgb(51, 94, 234); border-width: 0px; border-radius: 6px; background: rgb(51, 94, 234); font-family: HKGroteskPro, serif; font-size: 19px; line-height: 1.5; letter-spacing: 0px; display: flex; }  #wk_element_6aef8c2761d05f7a7fee01f707ee3d9f :not(:last-child) { margin-bottom: 0px; }  #wk_element_0395e8cddb33074c3bdcf16019d90668 { width: 540px; max-width: 100%; min-height: 16px; padding: 16px 0px 0px; margin: 0px auto; border-style: none; color: rgb(0, 0, 0); background: rgb(255, 255, 255); }  #wk_element_0395e8cddb33074c3bdcf16019d90668_calendar { background: rgb(201, 189, 139); }  #wk_element_d94017575195c57e80b94bab113f9bdc { max-width: 540px; min-height: 16px; padding: 0px; margin: 0px auto; border-style: solid; border-color: rgb(255, 255, 255); border-width: 0px; border-radius: 16px; background: rgb(255, 255, 255); }}@media (max-width: 992px) {  #wk_element_0395e8cddb33074c3bdcf16019d90668 { }}@media (max-width: 768px) {  #wk_element_0395e8cddb33074c3bdcf16019d90668 { }}</style><div class="wk_root" style="width: 100%; z-index: 100000;"><div class="wk_ascend_tree col-12 col-md my-auto shadow wk_column wk_editor_hide_tooltips" id="wk_element_d94017575195c57e80b94bab113f9bdc" data-custom-css-classes="shadow" data-wk-border-style-desktop="solid" data-wk-background-type-desktop="solid"> <div class="wk_registration_timer" id="wk_element_0395e8cddb33074c3bdcf16019d90668" data-wk-background-type-desktop="solid" data-wk-border-style-desktop="default" calendar="hide" data-classes="wk_registration_timer" data-wk-days-label="gün" data-wk-hours-label="saat" data-wk-in-progress-text="🔴 Canlı yayın şu anda DEVAM EDİYOR — kaydol, hemen katıl!" data-wk-instant-watch-text="🔴 Canlı yayın başladı! Hemen katıl." data-wk-minutes-label="dakika" data-wk-next-session-text="Canlı yayına kalan süre:" data-wk-seconds-label="saniye" data-wk-webinar-id="6a41a845d47c4bb5a2f75f76" timer_size="small"><div class="wk_row_internal mx-0"><div class="col px-0 wk_timer"><div class="rounded-2 shadow mx-auto wk_calendar" style="max-width: 170px; background: rgb(255, 255, 255); display: none;"><div id="wk_element_0395e8cddb33074c3bdcf16019d90668_calendar" class="wk_calendar_color" style="border-top-left-radius: 0.375rem; border-top-right-radius: 0.375rem;"><h5 class="fw-bold text-white text-uppercase text-center py-2 wk_calendar_month">Haziran</h5></div><h1 class="fw-bold text-center pb-2 mb-2 wk_calendar_day">29</h1></div><h4 class="text-center mt-5 mb-4 wk_calendar_header" style="display: none;"><i class="fa-regular fa-clock"></i><span class="wk_calendar_time"> 17:30 GMT+3</span></h4><h4 class="text-center fw-bold wk_timer_header">Canlı yayına kalan süre:</h4><div class="wk_row_internal mx-auto wk_timer_row" style=""><div class="col-3"><h2 class="text-center mt-3 mb-0 wk_timer_days">0</h2><h3 class="text-center wk_timer_days_label">gün</h3></div><div class="col-3"><h2 class="text-center mt-3 mb-0 wk_timer_hours">0</h2><h3 class="text-center wk_timer_hours_label">saat</h3></div><div class="col-3"><h2 class="text-center mt-3 mb-0 wk_timer_minutes">0</h2><h3 class="text-center wk_timer_minutes_label">dakika</h3></div><div class="col-3"><h2 class="text-center mt-3 mb-0 wk_timer_seconds">0</h2><h3 class="text-center wk_timer_seconds_label">saniye</h3></div></div></div></div></div> <div class="wk_editor_hide_tooltips shadow shadow-none wk_registration_form" id="wk_element_399409224331983c0bb3717d18e66cc0" data-wk-background-type-desktop="solid" data-wk-border-style-desktop="solid" data-wk-enable-instant-watch="false" data-custom-css-classes="shadow-none" data-wk-date-format-type="tr-TR" data-wk-webinar-id="6a41a845d47c4bb5a2f75f76" data-wk-in-progress-text="Webinar şu anda başladı — kaydol ve hemen katıl." data-wk-number-of-sessions-to-show="1"> <form class="wk_ascend_tree wk_registration_form_element"> <select class="mb-3 bg-light form-select form-select-lg wk_registration_form_date" onchange="set_date_text(event,this.value)"></select><input class="wk_registration_form_date_text" type="hidden"><input class="mb-3 bg-light form-control form-control-lg wk_registration_form_first_name" placeholder="Adınız" required=""><input class="mb-3 bg-light form-control form-control-lg d-none wk_registration_form_last_name" placeholder="Last Name"><input class="mb-3 bg-light form-control form-control-lg wk_registration_form_email" placeholder="E-posta adresiniz" oninput="wk_input_change(this)" type="email" required=""><input class="form-control form-control-lg bg-light mb-3 wk_registration_form_phone" type="tel" placeholder="Telefon numaranız" oninput="wk_input_change(this)"><input class="mb-3 bg-light form-control form-control-lg d-none wk_registration_form_custom_field_1" placeholder="Custom Field 1"><input class="mb-3 bg-light form-control form-control-lg d-none wk_registration_form_custom_field_2" placeholder="Custom Field 2"><input class="mb-3 bg-light form-control form-control-lg d-none wk_registration_form_custom_field_3" placeholder="Custom Field 3"><input class="mb-3 bg-light form-control form-control-lg d-none wk_registration_form_custom_field_4" placeholder="Custom Field 4"><input class="mb-3 bg-light form-control form-control-lg d-none wk_registration_form_custom_field_5" placeholder="Custom Field 5"> <div class="mb-3 mx-0 p-0 wk_registration_form_checkbox wk_row_internal d-none"> <div class="my-auto col-auto"> <div class="wk_checkbox"><input class="wk_checkbox_input" type="checkbox" id="wk_element_399409224331983c0bb3717d18e66cc0_checkbox"></div> </div> <div class="my-auto col"> <div class="wk_editor_hide_tooltips wk_text" id="wk_element_889d2c8b54ae5001837c2ec42ca72c7e" data-wk-background-type-desktop="default" data-wk-border-style-desktop="default"> <div contenteditable="false" style="width: 100%; margin-top: auto; margin-bottom: auto;"> <p>I consent to receiving emails and/or text message reminders for this event.</p> </div> </div> </div> </div> <div class="wk_editor_hide_tooltips wk_button btn btn-lg wk_button_hide_settings" id="wk_element_6aef8c2761d05f7a7fee01f707ee3d9f" data-wk-background-type-desktop="solid" data-wk-border-style-desktop="solid" onclick="webinar_registration_submit(event)"> <div contenteditable="false" style="width: 100%; margin-top: auto; margin-bottom: auto;"> <p><b>YERİMİ AYIRT!</b></p> </div> </div> </form> </div> </div></div>`;

const OVERRIDE_CSS = `
#wk-canli-embed .d-none { display: none !important; }
#wk-canli-embed .wk_row_internal { display: flex; flex-wrap: wrap; margin-left: 0; margin-right: 0; }
#wk-canli-embed .wk_timer_row { display: flex; flex-wrap: nowrap; }
#wk-canli-embed .col { flex: 1 0 0%; }
#wk-canli-embed .col-3 { flex: 0 0 auto; width: 25%; }
#wk-canli-embed .col-12 { flex: 0 0 auto; width: 100%; }
#wk-canli-embed .col-auto { flex: 0 0 auto; width: auto; }
#wk-canli-embed .col-md { flex: 1 0 0%; }
#wk-canli-embed .form-control,
#wk-canli-embed .form-select { display: block; width: 100%; padding: 0.65rem 0.9rem; font-size: 1rem; line-height: 1.5; box-sizing: border-box; }
#wk-canli-embed .form-control-lg,
#wk-canli-embed .form-select-lg { padding: 0.8rem 1rem; font-size: 1.05rem; }
#wk-canli-embed .btn { display: inline-block; width: 100%; cursor: pointer; text-align: center; font-weight: 700; box-sizing: border-box; }
#wk-canli-embed .btn-lg { padding: 0.85rem 1.25rem; font-size: 1.25rem; }
#wk-canli-embed .text-center { text-align: center; }
#wk-canli-embed .fw-bold { font-weight: 700; }
#wk-canli-embed .mx-auto { margin-left: auto; margin-right: auto; }
#wk-canli-embed .mx-0 { margin-left: 0; margin-right: 0; }
#wk-canli-embed .px-0 { padding-left: 0; padding-right: 0; }
#wk-canli-embed .p-0 { padding: 0; }
#wk-canli-embed .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
#wk-canli-embed .pb-2 { padding-bottom: 0.5rem; }
#wk-canli-embed .my-auto { margin-top: auto; margin-bottom: auto; }
#wk-canli-embed .mb-0 { margin-bottom: 0; }
#wk-canli-embed .mb-2 { margin-bottom: 0.5rem; }
#wk-canli-embed .mb-3 { margin-bottom: 1rem; }
#wk-canli-embed .mb-4 { margin-bottom: 1.5rem; }
#wk-canli-embed .mt-3 { margin-top: 1rem; }
#wk-canli-embed .mt-5 { margin-top: 2.5rem; }
#wk-canli-embed .wk_root { box-sizing: border-box; }
#wk-canli-embed * { box-sizing: border-box; }
#wk-canli-embed .wk_column,
#wk-canli-embed .wk_registration_form,
#wk-canli-embed .wk_registration_timer { background: #1A1A1A !important; color: #FFFFFF !important; border-radius: 16px !important; border-color: rgba(255,255,255,0.08) !important; }
#wk-canli-embed .wk_timer_header { color: #E8C872 !important; }
#wk-canli-embed .wk_timer_days, #wk-canli-embed .wk_timer_hours, #wk-canli-embed .wk_timer_minutes, #wk-canli-embed .wk_timer_seconds,
#wk-canli-embed .wk_timer_days_label, #wk-canli-embed .wk_timer_hours_label, #wk-canli-embed .wk_timer_minutes_label, #wk-canli-embed .wk_timer_seconds_label { color: #FFFFFF !important; }
#wk-canli-embed .wk_registration_form .form-control,
#wk-canli-embed .wk_registration_form .form-select { background: #242424 !important; color: #FFFFFF !important; border: 1px solid #3A3A3A !important; border-radius: 12px !important; }
#wk-canli-embed .wk_registration_form .form-control::placeholder { color: #9A9A9A !important; }
#wk-canli-embed .wk_registration_form .form-select option { background: #242424; color: #FFFFFF; }
#wk-canli-embed .wk_button { background: #FBBF24 !important; border-color: #FBBF24 !important; border-radius: 12px !important; box-shadow: 0 0 40px rgba(251,191,36,0.3) !important; }
#wk-canli-embed .wk_button:hover { background: #F59E0B !important; border-color: #F59E0B !important; }
#wk-canli-embed .wk_button p, #wk-canli-embed .wk_button b { color: #000000 !important; }
#wk-canli-embed .iti { width: 100%; }
#wk-canli-embed .iti__country-list { background: #242424 !important; color: #FFFFFF !important; }
#wk-canli-embed .iti__country.iti__highlight { background: #3A3A3A !important; }
`;

export default function WebinarKitEmbed() {
  return (
    <div id="wk-canli-embed" className="w-full max-w-[540px] mx-auto">
      <style dangerouslySetInnerHTML={{ __html: OVERRIDE_CSS }} />
      <div dangerouslySetInnerHTML={{ __html: FORM_HTML }} />

      {/* Step 2 — gerçek <script> tag'leri, formun hemen altında, sırayla.
          CSP'de webinarkit.com + cdn.jsdelivr.net izinli olmalı (vercel.json). */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/intl-tel-input@19.5.6/build/css/intlTelInput.css"
      />
      <link rel="stylesheet" href="https://webinarkit.com/css/ewk_v5.css?cache=5" />
      {/* eslint-disable @next/next/no-sync-scripts */}
      <script src="https://cdn.jsdelivr.net/npm/intl-tel-input@19.5.6/build/js/intlTelInput.min.js" />
      <script src="https://cdn.jsdelivr.net/npm/luxon@3.4.4/build/global/luxon.min.js" />
      <script src="https://webinarkit.com/js/ewk_v7.js?v=7&sv=true" />
      <script src="https://webinarkit.com/js/ewk_i.js?v=1" />
      {/* eslint-enable @next/next/no-sync-scripts */}
    </div>
  );
}
