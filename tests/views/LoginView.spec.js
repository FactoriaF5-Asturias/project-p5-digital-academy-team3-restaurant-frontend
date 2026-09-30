import { describe } from "vitest";
import LoginView from "../../src/views/LoginView.vue";
import { shallowMount } from "@vue/test-utils";

describe('LoginView', () => {

    function mountLogin() {
            return shallowMount(LoginView, {
                global: {
                }
            })
        }

})