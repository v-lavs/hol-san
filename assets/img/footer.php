<?php
/**
 * The template for displaying the GERPEVIR footer
 */

?>


<footer class="footer">
    <?php $disclaimer = get_field('disclaimer', 'option'); ?>
    <?php $disclaimer_mob = get_field('disclaimer_mob', 'option'); ?>
    <div class="disclaimer" >
        <picture>
            <source srcset="<?php echo $disclaimer_mob; ?>" media="(max-width: 780px)" />
            <img src="<?php echo $disclaimer; ?>" alt="Самолікування може бути шкідливим для вашого здоров'я">
        </picture>
    </div>
    <div id="triggerDisclaimer"></div>
        <div class="footer_top" >
            <div class="footer__text">
                Реклама лікарського засобу. Перед використанням необхідно обов'язково проконсультуватися з лікарем та
                ознайомитися з інструкцією для медичного застосування Пен-Герпевір® крем 10 мг/г по 2 г в тубі. Умови
                відпуску: без рецепту. Зберігати в недоступному для дітей місці. Виробник АТ «Київмедпрепарат», Україна,
                01032, м. Київ, вул. Саксаганського, 139. РП № UA/17283/01/01 з 21.03.2019 по 21.03.2024.
            </div>
        </div>
        <div class="footer_bottom">
            <a href="#" class="footer__logo" target="_blank">
                <img src="<?php echo GERPEVIR_URI; ?>/assets/img/logo-arterium.svg" alt="logo Arterium" class="img">
            </a>
            <div class="copyright">
                <div>© 2024. Всі права захищені</div><div>Development by  <a href="https://profi-creative.com/">Profi Creative</a></div>
            </div>
        </div>
</footer>
</div><!-- close .wrapper -->

<?php wp_footer(); ?>
</body>

</html>




