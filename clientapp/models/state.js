/*global app, $, me*/
"use strict";

var HumanModel = require('human-model');

module.exports = HumanModel.define({
    initialize: function () {
        var self = this;
        $(window).blur(function () {
            self.focused = false;
        });
        $(window).focus(function () {
            self.focused = true;
            if (me._activeContact) {
                me.setActiveContact(me._activeContact);
            }
            self.markActive();
        });

        app.desktop.on('sleep', function () {
            clearTimeout(this.idleTimer);
            console.log('went to sleep');
            self.markInactive();
        });

        this.markActive();
    },
    session: {
        focused: ['bool', true, true],
        active: ['bool', true, false],
        connected: ['bool', true, false],
        hasConnected: ['bool', true, false],
        idleTimeout: ['number', true, 600000],
        idleSince: 'date',
        allowAlerts: ['bool', true, false],
        badge: ['string', true, ''],
        pageTitle: ['string', true, ''],
        hasActiveCall: ['boolean', true, false]
    },
    derived: {
        title: {
            deps: ['pageTitle', 'badge'],
            fn: function () {
                var base = this.pageTitle ? 'Otalk - ' + this.pageTitle : 'Otalk';
                if (this.badge) {
                    return this.badge + ' • ' + base;
                }
                return base;
            }
        }
    },
    markActive: function () {
        clearTimeout(this.idleTimer);

        var wasInactive = !this.active;
        this.active = true;
        this.idleSince = new Date(Date.now());

        this.idleTimer = setTimeout(this.markInactive.bind(this), this.idleTimeout);
    },
    markInactive: function () {
        if (this.focused) {
            return this.markActive();
        }

        this.active = false;
        this.idleSince = new Date(Date.now());
    }
});